import Exponent from 'expo'
import React, {Component} from 'react'
import firebase from 'firebase'
import {View, StyleSheet} from 'react-native'
import FacebookButton from '../components/facebookButton'
import GoogleButton from '../components/googleButton'

export default class Login extends Component {

  facebookAuthenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  googleAuthenticate = token => {
    const credential = firebase.auth.GoogleAuthProvider.credential(token)
    firebase.auth().signInWithCredential(credential)
  }

  loginWithFacebook = async () => {
    const ADD_ID = '960367194110449'
    const options = {
      permissions: ['public_profile', 'email']
    }
    const {type, token} = await Exponent.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      this.facebookAuthenticate(token)
    }
  }

  loginWithGoogle = async () => {
    const IOS_CLIENT_ID = '1094907620636-ku81k804klvu49nkhu40no9q3kq40s8h.apps.googleusercontent.com'
    const ANDROID_CLIENT_ID = '1094907620636-2nc24g8a0osf6bm6npms6arapqdpe721.apps.googleusercontent.com'
    const options = {
      scopes: ['profile', 'email']
    }
    const {idToken, type} = await Expo.Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      options
    })
    
    if (type === 'success') {
      this.googleAuthenticate(idToken)
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FacebookButton onPress={this.loginWithFacebook}/>
        <GoogleButton onPress={this.loginWithGoogle} />
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
