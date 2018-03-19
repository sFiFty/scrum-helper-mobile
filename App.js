import React from 'react'
import {StyleSheet, Text, FlatList, View} from 'react-native'
import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCsvsRfjNbr7shO9p4nG2Argq6QAxwDr8A",
  databaseURL: "https://my-helper-4e161.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)
export default class App extends React.Component {
  state = {
    meetings: []
  }

  componentWillMount() {
    firebase.database().ref().child('dailyMeetings').on('value', snap => {
      let meetings = []
      let teamId = null
      let meeting = {}
      snap.forEach(meeting => {
        const {team, members, step} = meeting.val()
        teamId = team
        meeting.key = teamId
        meeting.members = members
        meeting.step = step
        firebase.database().ref().child(`teams/${teamId}`).once('value', snap => {
          const {name} = snap.val()
          meeting.teamName = name
          meetings.push(meeting)
          this.setState({meetings: meetings})
        })
      })

    })
  }

  render() {
    const {meetings} = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={meetings}
          renderItem={({item}) => <Text>{item.teamName}</Text>}
        />
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
