import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native'

import styles from './Styles/ListChatStyles'
import { Colors } from '../Themes'

export default class ListChat extends React.PureComponent {
  render () {
    const marginTop = this.props.isFirst ? 10 : 0
    let renderName = null
    let renderPhoto = null
    if (this.props.type === 'group') {
      if (this.props.isFirst) {
        renderName = (
          <Text style={styles.name}>{this.props.name}</Text>
        )
        renderPhoto = (
          <Image source={{ uri: this.props.photo }} style={styles.photo} />
        )
      } else {
        renderPhoto = (
          <View style={{ width: 40 }} />
        )
      }
    }
    if (this.props.email === this.props.emailSender) {
      return (
        <View style={[styles.senderContainer, { marginTop: marginTop }]}>
          <View style={{ flex: 1 }} />
          <View style={[styles.statusContainer, { marginRight: 10 }]}>
            <Text style={styles.textDate}>{this.props.time}</Text>
          </View>
          <TouchableOpacity
            style={styles.messageContainer}
            activeOpacity={0.8}
            onLongPress={() => ToastAndroid.show('onlong press', ToastAndroid.SHORT)}
          >
            <Text style={styles.textMessage}>{this.props.message}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={[styles.senderContainer, { marginTop: marginTop }]}>
          {renderPhoto}
          <View style={{ flexDirection: 'column' }}>
            {renderName}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.messageContainer, { backgroundColor: Colors.border }]}
                activeOpacity={0.8}
                onLongPress={() => ToastAndroid.show('onlong press', ToastAndroid.SHORT)}
              >
                <Text style={styles.textMessage}>{this.props.message}</Text>
              </TouchableOpacity>
              <View style={[styles.statusContainer, { marginLeft: 10 }]}>
                <Text style={styles.textDate}>{this.props.time}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      )
    }
  }
}
