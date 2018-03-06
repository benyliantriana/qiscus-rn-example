import React from 'react'
import { Platform } from 'react-native'
import {
  Scene,
  Router,
  Reducer,
  Stack
} from 'react-native-router-flux'

import NavBar from '../Components/NavBar'

import Login from '../Containers/Login'
import App from '../Containers/App'

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    return defaultReducer(state, action)
  }
}

const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://'

const Navigation = () => (
  <Router
    createReducer={reducerCreate}
    uriPrefix={prefix}
  >
    <Stack
      hideNavBar={false}
      key='root'
      titleStyle={{ alignSelf: 'center' }}
    >
      <Scene
        key='login'
        title='CustomNavBar 1'
        navBar={NavBar}
        hideNavBar={false}
        component={Login}
      />
      <Scene
        key='app'
        title='CustomNavBar 2'
        hideNavBar
        component={App}
      />
    </Stack>
  </Router>
)

export default Navigation
