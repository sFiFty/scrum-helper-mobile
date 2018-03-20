import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import FacebookButton from '../components/facebookButton'

export default class Login extends Component {

  render() {
    return (
      <View style={styles.container} >
        <FacebookButton onPress={() => console.log('press')}/>
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
