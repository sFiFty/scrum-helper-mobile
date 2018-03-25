import Exponent from 'expo'
import React, {Component} from 'react'
import firebase from 'firebase'
import {NavigationActions} from 'react-navigation'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import FacebookButton from '../../components/facebookButton'
import GoogleButton from '../../components/googleButton'

export default class Login extends Component {
  state = {
    isLoading: true
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', snap => {
          const user = snap.val()
          if (user != null) {
            this.firebaseRef.child('users').off('value')
            this.goHome(user)
          } else {
            this.setState({isLoading: false})
          }
        }) 
      } else {
        this.setState({isLoading: false})
      }
    })
  }

  goHome = user => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Home', params:{user}}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  facebookAuthenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  googleAuthenticate = token => {
    const credential = firebase.auth.GoogleAuthProvider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  loginWithFacebook = async () => {
    this.setState({isLoading: true})
    const ADD_ID = '960367194110449'
    const options = {
      permissions: ['public_profile', 'email']
    }
    const {type, token} = await Exponent.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      const userData = await response.json()
      const {uid} = await this.facebookAuthenticate(token)
      this.createUser(uid, userData)
    }
  }

  loginWithGoogle = async () => {
    this.setState({isLoading: true})
    const IOS_CLIENT_ID = '1094907620636-ku81k804klvu49nkhu40no9q3kq40s8h.apps.googleusercontent.com'
    const ANDROID_CLIENT_ID = '1094907620636-2nc24g8a0osf6bm6npms6arapqdpe721.apps.googleusercontent.com'
    const options = {
      scopes: ['profile', 'email']
    }
    const {idToken, type, user} = await Expo.Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      options
    })
    
    if (type === 'success') {
      const {uid} = await this.googleAuthenticate(idToken)
      this.createUser(uid, user)
    }
  }

  createUser = (uid, userData) => {
    firebase.database().ref('users').child(uid).update({...userData, uid: uid})
  }

  render() {
    const {isLoading} = this.state
    return (
      <View style={styles.container} >
        {
          isLoading ? 
          <ActivityIndicator animating={isLoading} /> :
          <View>
            <FacebookButton onPress={this.loginWithFacebook}/>
            <GoogleButton onPress={this.loginWithGoogle} />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
