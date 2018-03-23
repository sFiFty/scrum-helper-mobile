import React, {Component} from 'react'
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default class FacebookButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <FontAwesome name={'facebook-f'} size={20} color={'white'} />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </View>      
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 220,
    backgroundColor: '#3b5998',
    borderRadius: 50,
    marginBottom: 5
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 15
  }
})