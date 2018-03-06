import * as actions from '../actions/user'
import { reqState, succState, failState, buildInitState, createReducer } from '../config'

const initUser = buildInitState({
  email: '',
  token: '',
  uid: 0,
  user: {}
})

export const auth = createReducer(initUser)
  .addReducer({
    type: actions.USER_LOGIN,
    customReqState: (state, action) => ({ ...reqState(initUser), email: action.email }),
    customSuccState: (state, action) => ({
      email: action.data.email,
      token: action.data.token,
      uid: action.data.id,
      user: action.data,
      ...succState(action) }),
    customFailState: (state, action) => ({ ...initUser, ...failState(action) })
  })
  .addReducer({
    type: actions.USER_LOGOUT,
    customReqState: (state, action) => ({
      email: state.email,
      token: state.token,
      uid: state.uid,
      user: state.user,
      ...reqState() }),
    customSuccState: (state, action) => ({ ...initUser, ...succState(action) })
  }).run()