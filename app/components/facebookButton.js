import React, {Component} from 'react'
import {TouchableHighlight, Text, StyleSheet} from 'react-native'

export default class FacebookButton extends Component {

  render() {
    return (
      <TouchableHighlight>
        <Text>Login with Facebook</Text>
      </TouchableHighlight>
    )
  }
}
