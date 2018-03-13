import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  itemContainer: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 160,
    marginBottom: 15,
    marginRight: 15,
    resizeMode: 'cover'
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 15,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  },
  textName: {
    fontFamily: 'regular',
    fontSize: 14,
    lineHeight: 19,
    color: Colors.black
  },
  textMessage: {
    fontFamily: 'regular',
    fontSize: 11,
    lineHeight: 15,
    color: Colors.label
  },
  unreadContainer: {
    flexDirection: 'column',
    paddingBottom: 15
  }
})
