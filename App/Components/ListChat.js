import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import PropTypes from 'prop-types'
import I18n from 'react-native-i18n'

import styles from './Styles/ListChatStyles'
import { Colors, Images, Dictionary } from '../Themes'

I18n.translations = Dictionary

export default class ListChat extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: this.props.email,
      emailSender: this.props.emailSender,
      type: this.props.type,
      message: this.props.message,
      time: this.props.time,
      isFirst: this.props.isFirst,
      name: this.props.name,
      photo: this.props.photo,
      isDelivered: this.props.isDelivered,
      isFailed: this.props.isFailed,
      isPending: this.props.isPending,
      isRead: this.props.isRead,
      isSent: this.props.isSent
    }
  }

  static propTypes = {
    email: PropTypes.string,
    emailSender: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string,
    isFirst: PropTypes.bool,
    name: PropTypes.string,
    photo: PropTypes.string,
    isDelivered: PropTypes.bool,
    isFailed: PropTypes.bool,
    isPending: PropTypes.bool,
    isRead: PropTypes.bool,
    isSent: PropTypes.bool,
    onLongPress: PropTypes.func
  }

  renderSelfStatus () {
    const { isDelivered, isFailed, isPending, isRead, isSent } = this.props
    if (isRead) {
      return <Image source={Images.isRead} style={styles.statusRead} />
    } else if (isDelivered) {
      return <Image source={Images.isDelivered} style={styles.statusDelivered} />
    } else if (isPending) {
      return <Image source={Images.isPending} style={styles.statusPending} />
    } else if (isFailed) {
      return <Image source={Images.isFailed} style={styles.statusFailed} />
    }
  }

  renderMessageRetry () {
    const { isFailed } = this.state
    if (isFailed) {
      return (
        <View style={{ flexDirection: 'row', marginRight: 5, marginBottom: 5 }}>
          <View style={{ flex: 1 }} />
          <Text style={styles.textFailed}>{I18n.t('isFailed')}</Text>
          <TouchableOpacity>
            <Text style={[styles.textFailed, { color: Colors.green }]}>{I18n.t('retry')}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

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
    if (this.props.email === this.props.emailSender) { // our message
      return (
        <View style={{ flexDirection: 'column', marginTop: marginTop }}>
          <View style={[styles.senderContainer]}>
            <View style={{ flex: 1 }} />
            <View style={[styles.statusContainer, { marginRight: 5 }]}>
              <Text style={styles.textDate}>{this.props.time}</Text>
              <View style={styles.imageStatusContainer}>
                {this.renderSelfStatus()}
              </View>
            </View>
            <TouchableOpacity
              style={styles.messageContainer}
              activeOpacity={0.8}
              onLongPress={() => this.props.onLongPress()}
            >
              <Text style={styles.textMessage}>{this.props.message}</Text>
            </TouchableOpacity>
          </View>
          {this.renderMessageRetry()}
        </View>
      )
    } else { // others message
      return (
        <View style={[styles.senderContainer, { marginTop: marginTop }]}>
          {renderPhoto}
          <View style={{ flexDirection: 'column' }}>
            {renderName}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.messageContainer, { backgroundColor: Colors.border }]}
                activeOpacity={0.8}
                onLongPress={() => this.props.onLongPress()}
              >
                <Text style={styles.textMessage}>{this.props.message}</Text>
              </TouchableOpacity>
              <View style={[styles.statusContainer, { marginLeft: 5 }]}>
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
