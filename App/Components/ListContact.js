import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'

import PropTypes from 'prop-types'

import styles from './Styles/ListContactStyles'
import I18n from 'react-native-i18n'
import ImageLoad from 'react-native-image-placeholder'

import { Dictionary, Images } from '../Themes'

I18n.translations = Dictionary

export default class ListContact extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      photo: this.props.photo,
      name: this.props.name
    }
  }

  static propTypes = {
    photo: PropTypes.string,
    name: PropTypes.string
  }

  render () {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.5}
        onPress={() => this.props.onPress()}
      >
          <ImageLoad
            style={styles.photo}
            source={{ uri: this.props.photo }}
            isShowActivity={false}
            resizeMode='cover'
            borderRadius={Platform.OS === 'ios' ? 15 : 160}
            placeholderSource={Images.loading}
            placeholderStyle={[styles.photo, { resizeMode: 'cover' }]}
          />
        <View style={styles.item}>
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 15 }}>
            <Text style={styles.textName}>{this.props.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
