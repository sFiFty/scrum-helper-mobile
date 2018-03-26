import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'

export default class NavTab extends Component {
  render() {
    const {label, navigate} = this.props
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        height: 90,
        marginBottom: 'auto',
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20}}>
        <TouchableOpacity onPress={navigate}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name={'md-arrow-round-back'} size={25} color={'black'} />
            <Text style={{
              fontSize: 25,
              marginLeft: 10
            }}>Back</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{
            fontSize: 25,
            marginRight: 30
          }}>{label}</Text>
        </View>
      </View>
    )
  }
}
