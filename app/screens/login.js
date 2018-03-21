import Exponent from 'expo'
import React, {Component} from 'react'
import firebase from 'firebase'
import {View, StyleSheet} from 'react-native'
import FacebookButton from '../components/facebookButton'
import GoogleButton from '../components/googleButton'

export default class Login extends Component {

  authenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  login = async () => {
    const ADD_ID = '960367194110449'
    const options = {
      permissions: ['public_profile', 'email']
    }
    const {type, token} = await Exponent.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      this.authenticate(token)
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FacebookButton onPress={this.login}/>
        <GoogleButton onPress={this.login} />
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
