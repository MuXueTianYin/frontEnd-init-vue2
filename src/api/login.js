import request from '@/utils/request'

const userApi = {
  Login: '/user/login',
  Logout: '/user/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/user/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserGetLogin: '/user/get/login',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserGetLogin,
    method: 'get'
    // url: userApi.UserInfo,
    // method: 'get',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // }
  })
}

export function getGetLogin () {
  return request({
    url: userApi.UserGetLogin,
    method: 'get'
  })
}
export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function Register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}
