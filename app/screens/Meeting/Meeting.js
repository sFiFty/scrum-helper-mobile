import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {MaterialIcons, FontAwesome, Ionicons} from '@expo/vector-icons'
import StepIndicator from 'react-native-step-indicator'
import {NavigationActions} from 'react-navigation'
import NavTab from '../../components/NavTab'
import MeetingControl from '../../components/MeetingControl'

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

  goHome = user => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Home'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  _prevStep = meeting => {
    meeting.step = meeting.step ? meeting.step - 1 : 0
    firebase.database().ref(`dailyMeetings/${meeting.key}`).update({
      step: meeting.step 
    }).then(() => {
      this.setState({meeting: meeting})
    })
  }

  _deleteMeeting = meeting => {
    meeting.step = meeting.step ? meeting.step - 1 : 0
    firebase.database().ref(`dailyMeetings/${meeting.key}`).remove().then(() => {
      this.goHome()
    })
  }

  buttonStyle = step => {
    if (step === 0) return [styles.button, styles.buttonDisabled]
    return styles.button
  }

  render() {
    const {meeting} = this.state
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'}}>
        <NavTab navigate={this.goHome} label={meeting.teamName + ' Daily Meeting'} />
        <View style={styles.meetingContainer}>
          <View style={styles.info}>
            <StepIndicator stepCount={4} customStyles={stepStyles} currentPosition={meeting.step} /> 
          </View>
          <View style={styles.buttonsContainer}>
            <MeetingControl action={() => this._prevStep(meeting)} type={'previous'} />
            {
              meeting.step === 3 ?
              <MeetingControl action={() => this._deleteMeeting(meeting)} type={'finish'} /> :
              <MeetingControl action={() => this._nextStep(meeting)} type={'next'} />
            }
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
  meetingContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 'auto'
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
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonDisabled: {
    opacity: 0.3
  }
})
