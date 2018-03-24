import {StackNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import Home from './screens/Home'
import Login from './screens/Login'
import Meeting from './screens/Meeting'


const firebaseConfig = {
  apiKey: "AIzaSyCsvsRfjNbr7shO9p4nG2Argq6QAxwDr8A",
  databaseURL: "https://my-helper-4e161.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

const RouteConfig = {
  Login: {screen: Login},
  Home: {screen: Home},
  Meeting: {screen: Meeting}
}

const StackNavigatorConfig = {
  headerMode: 'none'
}

export default StackNavigator(RouteConfig, StackNavigatorConfig)