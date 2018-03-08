import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigation from './App/Navigation/Navigation'
import { View } from 'react-native'
import { store } from './App/store'
import { Font } from 'expo'

/**
 * Provides an entry point into our application
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * Navigation.
 *
 */
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  async componentDidMount () {
    /**
     * Load the fonts before the load navigation
     */
    await Font.loadAsync({
      'bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'boldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
      'extraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'extraBoldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
      'italic': require('./assets/fonts/OpenSans-Italic.ttf'),
      'light': require('./assets/fonts/OpenSans-Light.ttf'),
      'lightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
      'regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'semiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'semiBoldItalic': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf')
    })
    this.setState({
      fontLoaded: true
    })
  }

  renderNavigation () {
    /**
     * navigation is rendered after the font fully loaded
    */
    const { fontLoaded } = this.state
    if (fontLoaded) {
      return (
        <Navigation />
      )
    }
    return null
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          {this.renderNavigation()}
        </View>
      </Provider>
    )
  }
}

export default App
