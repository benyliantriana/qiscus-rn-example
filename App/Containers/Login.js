import React from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Images, Dictionary } from '../Themes'

/**
 * import component
 */
import { TextInputLogin, Button } from '../Components'

import styles from './Styles/LoginStyles'

I18n.translations = Dictionary

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      displayName: ''
    }
  }

  renderLogo () {
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Images.logo} />
      </View>
    )
  }

  renderInputEmailAndDisplayName () {
    const { email, displayName, key } = this.state
    return (
      <View style={{ flexDirection: 'column' }}>
        <TextInputLogin
          label={I18n.t('email')}
          value={email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <View style={styles.separator} />
        <TextInputLogin
          label={I18n.t('displayName')}
          value={displayName}
          onChangeText={(value) => this.setState({displayName: value})}
        />
        <View style={styles.separator} />
        <TextInputLogin
          label={I18n.t('key')}
          value={key}
          onChangeText={(value) => this.setState({key: value})}
        />
      </View>
    )
  }

  renderButtonLogin () {
    return (
      <View style={styles.buttonContainer}>
        <Button
          label={I18n.t('start')}
          showArrow
          onPress={() => this.login()}
        />
      </View>
    )
  }

  login () {
    const { email } = this.state
    var format = /^([a-zA-Z0-9_\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (format.test(email)) {
      Actions.app({
        type: ActionConst.push // navigate to container app
      })
    } else {
      ToastAndroid.show('Invalid Email', ToastAndroid.SHORT)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={Images.background}
          resizeMode='stretch'
        >
          <View style={styles.scrollViewContainer}>
            <ScrollView
              keyboardShouldPersistTaps='handled'
              showsVerticalScrollIndicator={false}
            >
              {this.renderLogo()}
              {this.renderInputEmailAndDisplayName()}
              {this.renderButtonLogin()}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // variable reducer
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  // function action to change the state redux
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
