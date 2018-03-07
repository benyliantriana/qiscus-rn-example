import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { Colors, Images } from '../Themes'
import PropTypes from 'prop-types'

import styles from './Styles/ButtonStyles'

export default class TextInputLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showArrow: this.props.showArrow
    }
  }

  static propTypes = {
    showArrow: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    showArrow: false,
    onPress: {}
  }

  renderArrow () {
    const { showArrow } = this.state
    if (showArrow) {
      return <Image style={styles.nextArrow} source={Images.nextArrow} />
    } else {
      return null
    }
  }

  render () {
    const { showArrow } = this.state
    const styleButton = showArrow ? styles.buttonFull : styles.buttonNotFull
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styleButton}
          onPress={() => this.props.onPress()}
        >
          <Text style={styles.textButton}>{this.props.label}</Text>
          {this.renderArrow()}
        </TouchableOpacity>
      </View>
    )
  }
}
