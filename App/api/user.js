import { publicApiQiscus } from './api'
import { buildQuery } from '../config'

export const login = (action) => {
  const axios = publicApiQiscus()
  return axios.post('users/login', action)
}

export const logout = () => ({ message: 'LOGOUT SUCCESS', code: 0 })