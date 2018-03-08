import React from 'react'
import {
  Scene,
  Router,
  Stack
} from 'react-native-router-flux'

/**
 * NavBar is the component for header (applied to all container)
 * if a container doesn't need it then we can set the hideNavBar to true
 */
// import NavBar from '../Components/NavBar'

/**
 * We can register all the containers in our apps in the navigator by importing them
 * and add them to the scene navigation
 */
import Login from '../Containers/Login'
import App from '../Containers/App'

/**
 * key is the variable we used to call the container (can be pop, push, reset, etc)
 * title shown in the middle of the header
 * component is the where we set the container
 */

const Navigation = () => (
  <Router>
    <Stack
      hideNavBar={false}
      key='root'
      titleStyle={{ alignSelf: 'center' }}
    >
      <Scene
        key='login'
        title=''
        hideNavBar
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
