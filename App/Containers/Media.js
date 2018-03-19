import React from 'react'
import I18n from 'react-native-i18n'
import {
  View
} from 'react-native'

import { Actions, ActionConst } from 'react-native-router-flux'
import { ImagePicker } from 'expo'
import { Images, Dictionary } from '../Themes'

/**
 * import component
 */
import { Header } from '../Components'

import styles from './Styles/MediaStyles'

I18n.translations = Dictionary

class Media extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageName: 'Insert Image',
      typeAttach: this.props.typeAttach // camera or gallery
    }
  }

  async componentDidMount () {
    const type = await this.props.typeAttach
    if (type === 'camera') {
      this.openCamera()
    } else {
      this.openGallery()
    }
  }

  async openCamera () {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      aspect: [4, 3]
    })
    console.log(result)
    if (result.cancelled) {
      this.back()
    }
  }

  async openGallery () {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
      mediaTypes: 'Images',
      aspect: [4, 3]
    })
    console.log(result)
    if (result.cancelled) {
      this.back()
    }
  }

  back () {
    Actions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.imageName}
          onLeftPress={() => this.back()}
        />
      </View>
    )
  }
}

export default Media
