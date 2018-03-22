import React, {Component} from 'react'
import {StyleSheet, Text, FlatList, View, TouchableHighlight} from 'react-native'
import * as firebase from 'firebase'

export default class Home extends Component {
  state = {
    meetings: [],
    selectedMeeting: null,
    user: null //this.props.navigation.state.params.user
  }

  getTeamById = teamId => {
    return new Promise(resolve => {
      firebase.database().ref().child(`teams/${teamId}`).once('value', snap => {
        resolve(snap.val())
      })
    })
  }

  getTeamName = async (meeting, meetings, last) => {
    const {name} = await this.getTeamById(meeting.team)
    meeting.teamName = name
    meetings.push(meeting)
    if (last) this.setState({meetings: meetings})
  }

  getMeetings = () => {
    firebase.database().ref().child('dailyMeetings').on('value', snap => {
      const meetings = snap.val()
      let localMeetings = []
      let teamId = null
      Object.keys(meetings).map((key, index) => {
        const meeting = meetings[key]
        meeting.key = key
        this.getTeamName(meeting, localMeetings, index === Object.keys(meetings).length - 1)
      })
    })
  }

  componentDidMount() {
    this.getMeetings()
  }

  _selectMeeting = meeting => {
    this.setState({selectedMeeting: meeting})
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
