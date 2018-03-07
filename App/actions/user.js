import { buildAction, typeReq } from '../config'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

/**
 * @param params are the same as the api
 * @state register
 */

/**
 * @param params are the same as the api
 * @state user
 */
export const login = params => buildAction(typeReq(USER_LOGIN), params)

/**
 * @state user
 */
export const logout = () => buildAction(typeReq(USER_LOGOUT))
