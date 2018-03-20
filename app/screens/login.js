import Exponent from 'expo'
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import FacebookButton from '../components/facebookButton'

export default class Login extends Component {

  login = async () => {
    const ADD_ID = '960367194110449'
    const options = {
      permissions: ['public_profile']
    }
    const {type, token} = await Exponent.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      console.log(await response.json())
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FacebookButton onPress={this.login}/>
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
