import apisauce from 'apisauce'
import { serviceUrl, apiQiscus, storage } from '../config'
import {token} from '../store'

/**
 * this is api that will be used in the apps
 * these type of api will be call in the saga file, connected with the reducer
 * base api can be editted in the config file
*/
export function authApi () {
  return apisauce.create({
    baseURL: serviceUrl + '/',
    headers: {'Authorization': token()}
  })
}

export function publicApi () {
  return apisauce.create({
    baseURL: serviceUrl + '/'
  })
}

export function publicApiQiscus () {
  return apisauce.create({
    baseURL: apiQiscus + '/',
    timeout: 10000
  })
}

export function uploadApi () {
  const api = apisauce.create({
    baseURL: apiQiscus + '/',
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data'
    }
  })
  api.addAsyncRequestTransform(config => async () => {
    const token = await storage.getItem('token')
    if (token !== null) {
      config.headers['Authorization'] = 'JWT ' + token
    }
    return config
  })
  return api
}

export function authApiQiscus (custToken, timeout = 10000) {
  const api = apisauce.create({
    baseURL: apiQiscus + '/',
    headers: { 'Content-Type': 'application/json' },
    timeout
  })
  api.addAsyncRequestTransform(config => async () => {
    const token = !custToken ? await storage.getItem('token') : custToken
    if (token !== null) {
      config.headers['Authorization'] = 'JWT ' + token
    }
    return config
  })
  return api
}
