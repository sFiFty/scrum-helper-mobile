import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
import styles from './styles'
export default class NavTab extends Component {
  render() {
    const {label, navigate} = this.props
    return (
      <View style={styles.container}>
        {
          navigate &&
          <TouchableOpacity onPress={navigate}>
            <View style={styles.buttonBackContainer}>
              <Ionicons name={'md-arrow-round-back'} size={25} color={'black'} />
              <Text style={styles.buttonBackText}>Back</Text>
            </View>
          </TouchableOpacity>
        }
        <View>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      </View>
    )
  }
}
