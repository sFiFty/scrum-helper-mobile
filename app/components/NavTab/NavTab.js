import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'

export default class NavTab extends Component {
  render() {
    const {label} = this.props
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        height: 60,
        marginBottom: 'auto',
        paddingTop: 30}}>
        <TouchableOpacity onPress={this.goHome}>
          <View>
            <Ionicons name={'md-arrow-round-back'} size={20} color={'black'} />
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>{label}</Text>
        </View>
      </View>
    )
  }
}
