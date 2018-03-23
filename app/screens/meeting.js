import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import * as firebase from 'firebase'
import {MaterialIcons} from '@expo/vector-icons'
import StepIndicator from 'react-native-step-indicator';

export default class Meeting extends Component {

  state = {
    meeting: this.props.navigation.state.params.meeting
  }

  _nextStep = meeting => {
    meeting.step = meeting.step + 1
    firebase.database().ref(`dailyMeetings/${meeting.key}`).update({
      step: meeting.step
    }).then(() => {
      this.setState({meeting: meeting})
    })
  }

  _prevStep = meeting => {
    meeting.step = meeting.step ? meeting.step - 1 : 0
    firebase.database().ref(`dailyMeetings/${meeting.key}`).update({
      step: meeting.step 
    }).then(() => {
      this.setState({meeting: meeting})
    })
  }

  render() {
    const {meeting} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.meetingContainer}>
          <View style={styles.info}>
            <Text style={styles.teamName}>{meeting.teamName} Daily Meeting</Text>
            <StepIndicator customStyles={stepStyles} currentPosition={meeting.step} /> 
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight style={styles.button} onPress={() => this._prevStep(meeting)}>
              <View style={styles.buttonContainer}>
                <MaterialIcons name={'navigate-before'} size={20} color={'white'} />
                <Text style={styles.buttonPrevText}>Previous</Text>
              </View>
            </TouchableHighlight> 
            <TouchableHighlight style={styles.button} onPress={() => this._nextStep(meeting)}>   
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonNextText}>Next</Text>
                <MaterialIcons name={'navigate-next'} size={20} color={'white'} />
              </View>
            </TouchableHighlight>   
          </View>
        </View>
      </View>
    )
  }
}

const stepStyles = {
  stepStrokeWidth: 3,
  separatorStrokeWidth: 2,
  stepStrokeFinishedColor: '#1b1c1d',
  stepStrokeUnFinishedColor: '#f7f7f7',
  separatorFinishedColor: '#1b1c1d',
  separatorUnFinishedColor: '#f7f7f7',
  stepIndicatorFinishedColor: '#1b1c1d',
  stepIndicatorUnFinishedColor: '#f7f7f7',
  stepIndicatorLabelUnFinishedColor: '#1b1c1d',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  meetingContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info: {
    height: 50,
    width: 200
  },
  teamName: {
    fontSize: 25,
    paddingBottom: 25,
    width: 200,
    textAlign: 'center'
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#1b1c1d',
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNextText: {
    color: 'white',
    fontSize: 15,
    marginRight: 5
  },
  buttonPrevText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5
  }
})
