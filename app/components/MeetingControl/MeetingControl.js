import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {MaterialIcons, FontAwesome} from '@expo/vector-icons'
import styles from './styles'

export default class MeetingControls extends Component {
  render() {
    const {action, type} = this.props
    return (
      type === 'finish' ?
        <TouchableOpacity 
          underlayColor="rgba(0, 0, 0, 0)" 
          style={styles.buttonFinish} 
          onPress={action}>  
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonNextTextFinish}>Finish</Text>
            <FontAwesome name={'remove'} size={20} color={'red'} />
          </View> 
        </TouchableOpacity> :
        <TouchableOpacity 
        underlayColor="rgba(0, 0, 0, 0)" 
        style={styles.button} 
        onPress={action}>
        <View style={styles.buttonContainer}>
          <MaterialIcons name={type == 'previous' ? 'navigate-before' : 'navigate-next'} size={20} color={'black'} />
          <Text style={type == 'previous' ? styles.buttonPrevText : styles.buttonNextText}>
            {type == 'previous' ? 'Previous' : 'Next'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

