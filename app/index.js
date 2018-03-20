import {StackNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import Home from './screens/home'
import Login from './screens/login'


const firebaseConfig = {
  apiKey: "AIzaSyCsvsRfjNbr7shO9p4nG2Argq6QAxwDr8A",
  databaseURL: "https://my-helper-4e161.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

const RouteConfig = {
  Login: {screen: Login},
  Home: {screen: Home}
}

const StackNavigatorConfig = {
  headerMode: 'none'
}

export default StackNavigator(RouteConfig, StackNavigatorConfig)