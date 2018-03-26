import React from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'

import { Actions, ActionConst } from 'react-native-router-flux'
import { Images, Dictionary, Colors } from '../Themes'

/**
 * import component
 */
import { Header, ListContact } from '../Components'

import styles from './Styles/ContactStyles'

I18n.translations = Dictionary

class CreateGroup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  qiscus = this.props.qiscus
  emitter = this.props.emitter

  render () {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('groupInfo')}
        />
      </View>
    )
  }
}

export default CreateGroup
