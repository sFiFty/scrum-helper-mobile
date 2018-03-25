import React, {Component} from 'react'
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default class FacebookButton extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" style={styles.button} onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <FontAwesome name={'google-plus'} size={20} color={'white'} />
          <Text style={styles.buttonText}>Login with Google</Text>
        </View>      
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 220,
    backgroundColor: '#dd4b39',
    borderRadius: 50,
    marginTop: 5
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