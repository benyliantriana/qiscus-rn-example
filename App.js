import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigation from './App/Navigation/Navigation'
import { View, StatusBar } from 'react-native'
import { store } from './App/store'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentWillMount () {
    StatusBar.setBackgroundColor('#fff')
  }
  render () {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            ranslucent={false}
            animated={false}
            hidden={false}
            backgroundColor='#fff'
            barStyle='light-content'
          />
          <Navigation />
        </View>
      </Provider>
    )
  }
}

export default App
