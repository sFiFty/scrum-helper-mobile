import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import {MaterialIcons, FontAwesome, Ionicons} from '@expo/vector-icons'
import StepIndicator from 'react-native-step-indicator'
import {NavigationActions} from 'react-navigation'

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
        justifyContent: 'center',
      }}>
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
          paddingTop: 30
        }}>
          <TouchableOpacity onPress={this.goHome}>
            <View style={styles.buttonContainer}>
              <Ionicons name={'md-arrow-round-back'} size={20} color={'black'} />
              <Text style={styles.buttonPrevText}>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Text>{meeting.teamName} Daily Meeting</Text>
          </View>
        </View>
        <View style={styles.meetingContainer}>
          <View style={styles.info}>
            <StepIndicator stepCount={4} customStyles={stepStyles} currentPosition={meeting.step} /> 
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              underlayColor="rgba(0, 0, 0, 0)" 
              style={styles.button} 
              onPress={() => this._prevStep(meeting)}>
              <View style={styles.buttonContainer}>
                <MaterialIcons name={'navigate-before'} size={20} color={'black'} />
                <Text style={styles.buttonPrevText}>Previous</Text>
              </View>
            </TouchableOpacity> 
            {
            meeting.step === 3 ?
            <TouchableOpacity underlayColor="rgba(0, 0, 0, 0)" style={styles.buttonFinish} onPress={() => this._deleteMeeting(meeting)}>  
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonNextTextFinish}>Finish</Text>
                <FontAwesome name={'remove'} size={20} color={'red'} />
              </View> 
            </TouchableOpacity>  :
            <TouchableOpacity underlayColor="rgba(0, 0, 0, 0)" style={styles.button} onPress={() => this._nextStep(meeting)}> 
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonNextText}>Next</Text>
                <MaterialIcons name={'navigate-next'} size={20} color={'black'} /> 
              </View>
            </TouchableOpacity> 
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
    height: 200,
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
  button: {
    width: 150,
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#1b1c1d',
    backgroundColor: 'white'
  },
  buttonDisabled: {
    opacity: 0.3
  },
  buttonFinish: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: 'red',
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
  buttonNextTextFinish: {
    color: 'red',
    fontSize: 15,
    marginRight: 5
  },
  buttonNextText: {
    color: 'black',
    fontSize: 15,
    marginRight: 5
  },
  buttonPrevText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5
  }
})
