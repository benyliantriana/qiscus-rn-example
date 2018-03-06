import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/reducers'
import rootSaga from './saga/saga'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export function token () {
  const state = store.getState()
  // return state.user.token
  return 'JWT ' + state.user.token
}
