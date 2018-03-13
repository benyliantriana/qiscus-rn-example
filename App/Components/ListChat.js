import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import styles from './Styles/ListChatStyles'
import { Colors } from '../Themes';

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
        <TouchableOpacity style={[styles.senderContainer, { marginTop: marginTop }]}>
          <View style={{ flex: 1 }} />
          <View style={[styles.statusContainer, { marginRight: 10 }]}>
            <Text style={styles.textDate}>{this.props.time}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.textMessage}>{this.props.message}</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.senderContainer, { marginTop: marginTop }]}>
          {renderPhoto}
          <View style={{ flexDirection: 'column' }}>
            {renderName}
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.messageContainer, { backgroundColor: Colors.border }]}>
                <Text style={styles.textMessage}>{this.props.message}</Text>
              </View>
              <View style={[styles.statusContainer, { marginLeft: 10 }]}>
                <Text style={styles.textDate}>{this.props.time}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )
    }
  }
}
