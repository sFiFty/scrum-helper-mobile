import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
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