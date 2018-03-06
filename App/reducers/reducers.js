import { combineReducers } from 'redux'
import * as storage from 'redux-storage'

import * as userReducers from './user'

const user = {
  user: userReducers.auth
}

const reducers = storage.reducer(combineReducers({
  ...user
}))

export default reducers