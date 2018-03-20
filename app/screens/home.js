import React, {Component} from 'react'
import {StyleSheet, Text, FlatList, View, TouchableHighlight} from 'react-native'
import * as firebase from 'firebase'

export default class Home extends Component {
  state = {
    meetings: [],
    selectedMeeting: null
  }

  componentWillMount() {
    firebase.database().ref().child('dailyMeetings').on('value', snap => {
      let meetings = []
      let teamId = null
      let meeting = {}
      let i = 0
      snap.forEach(m => {
        meeting = m.val()
        meeting.key = meeting.timestamp
        meeting.id = Object.keys(snap.val())[i]
        i++
        firebase.database().ref().child(`teams/${meeting.team}`).once('value', snap => {
          const {name} = snap.val()
          meeting.teamName = name
          meetings.push(meeting)
          this.setState({meetings: meetings})
        })
      })

    })
  }

  _selectMeeting = meeting => {
    this.setState({selectedMeeting: meeting})
  }

  _nextStep = meeting => {
    let nextStep = meeting.step + 1
    firebase.database().ref(`dailyMeetings/${meeting.id}`).set({
      step: nextStep
    })
  }

  _prevStep = meeting => {
    let nextStep = meeting.step ? meeting.step - 1 : 0
    firebase.database().ref(`dailyMeetings/${meeting.id}`).set({
      step: nextStep
    })
  }

  render() {
    const {meetings, selectedMeeting} = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={meetings}
          renderItem={
            ({item}) => {
              return (
                <TouchableHighlight onPress={() => this._selectMeeting(item)}>
                  <Text style={styles.item}>{item.teamName}</Text>
                </TouchableHighlight>
              )
            }
          }
        />
        {
          selectedMeeting && 
          <View style={styles.container}>
            <Text>{selectedMeeting.teamName}</Text>
            <TouchableHighlight onPress={() => this._nextStep(selectedMeeting)}>
              <Text>Next Slide</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this._prevStep(selectedMeeting)}>
              <Text>Previous Slide</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
