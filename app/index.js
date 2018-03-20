import React, {Component} from 'react'
import * as firebase from 'firebase'
import Login from './screens/login'

const firebaseConfig = {
  apiKey: "AIzaSyCsvsRfjNbr7shO9p4nG2Argq6QAxwDr8A",
  databaseURL: "https://my-helper-4e161.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render() {
    return (
      <Login />
    )
  }
}