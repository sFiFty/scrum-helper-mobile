import React, {Component} from 'react'
import {StyleSheet, Text, FlatList, View, TouchableHighlight} from 'react-native'
import * as firebase from 'firebase'

export default class Home extends Component {
  state = {
    selectedMeeting: null,
  }

  _nextStep = meeting => {
    meeting.step = meeting.step + 1
    firebase.database().ref(`dailyMeetings/${meeting.key}`).update({
      step: meeting.step
    }).then(() => {
      this.setState({selectedMeeting: meeting})
    })
  }

  _prevStep = meeting => {
    meeting.step = meeting.step ? meeting.step - 1 : 0
    firebase.database().ref(`dailyMeetings/${meeting.key}`).update({
      step: meeting.step 
    }).then(() => {
      this.setState({selectedMeeting: meeting})
    })
  }

  render() {
    const {selectedMeeting} = this.state
    return (
      <View style={styles.container}>
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
  }
})
