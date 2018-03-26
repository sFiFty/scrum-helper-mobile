import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 90,
    marginBottom: 'auto',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  buttonBackContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBackText: {
    fontSize: 25,
    marginLeft: 10
  },
  labelText: {
    fontSize: 20,
    marginRight: 30,
    marginLeft: 20
  }
})