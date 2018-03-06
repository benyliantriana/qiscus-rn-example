import { put } from 'redux-saga/effects'
import * as actions from '../actions/user'
import * as apis from '../api/user'
import { errorHandling, typeSucc, typeFail, buildSaga, storage } from '../config'

export const login = function * login (action) {
  try {
    const result = yield apis.login(action)
    if (!result.ok) throw result
    yield storage.setItem('token', result.data.data.token)
    yield put({ type: typeSucc(actions.USER_LOGIN), ...result.data })
  } catch (e) {
    yield errorHandling(typeFail(actions.USER_LOGIN), e)
  }
}

export const logout = function * (action) {
  try {
    const data = yield apis.logout(action)
    yield storage.removeItem('token')
    yield put({ type: typeSucc(actions.USER_LOGOUT), ...data })
  } catch (e) {
    const data = {
      message: 'USER LOGOUT FAILED',
      code: 400
    }
    yield put({ type: typeFail(actions.USER_LOGOUT), ...data })
  }
}
