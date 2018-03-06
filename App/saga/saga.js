import { takeEvery, takeLatest } from 'redux-saga/effects'
import { typeReq } from '../config'

import * as userActions from '../actions/user'

import * as userSaga from './user'

function * dataSaga () {
  yield * user()
}

const user = function * () {
  yield takeEvery(typeReq(userActions.USER_LOGIN), userSaga.login)
  yield takeEvery(typeReq(userActions.USER_LOGOUT), userSaga.logout)
}

export default dataSaga