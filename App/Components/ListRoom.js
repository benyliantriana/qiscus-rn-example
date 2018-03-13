import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import styles from './Styles/ListRoomStyles'

export default class ListRoom extends React.PureComponent {
  render () {
    let viewUnread
    if (this.props.unreadCount > 0) {
      viewUnread = (
        <View style={styles.unreadContainer}>
          <Text style={styles.textUnread}>{this.props.unreadCount}</Text>
        </View>
      )
    } else if (this.props.unreadCount >= 999) {
      viewUnread = (
        <View style={[styles.unreadContainer, { padding: 2 }]}>
          <Text style={styles.textUnread}>999</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.8}
        onPress={() => this.props.onPress()}
      >
        <Image source={{ uri: this.props.avatar }} style={styles.photo} />
        <View style={styles.item}>
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 15 }}>
            <Text style={styles.textName}>{this.props.name}</Text>
            <Text style={styles.textMessage}>{this.props.lastMessage}</Text>
          </View>
          <View>
            <Text style={styles.textMessage}>{this.props.date}</Text>
            {viewUnread}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
