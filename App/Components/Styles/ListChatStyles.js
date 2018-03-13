import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  senderContainer: {
    flexDirection: 'row'
  },
  statusContainer: {
    flexDirection: 'column',
    marginTop: 10
  },
  textDate: {
    fontFamily: 'regular',
    fontSize: 12,
    lineHeight: 14,
    color: Colors.label
  },
  messageContainer: {
    backgroundColor: Colors.background,
    maxWidth: Dimensions.get('window').width * 2 / 3,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 3
  },
  textMessage: {
    fontFamily: 'regular',
    fontSize: 14,
    lineHeight: 23,
    color: Colors.grey
  },
  name: {
    fontFamily: 'semiBold',
    fontSize: 12,
    marginLeft: 4,
    lineHeight: 14,
    color: Colors.grey
  },
  photo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    resizeMode: 'cover',
    marginRight: 10,
    marginTop: 20
  }
})
