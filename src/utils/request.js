import axios from 'axios'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import store from '@/store'
// import storage from 'store'

// import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  // if (error.response) {
  //   const data = error.response.data
  //   console.log(error.response.status)
    // 从 localstorage 获取 token
  //   // const token = storage.get(ACCESS_TOKEN)
  //   if (error.response.status === 403) {
  //     notification.error({
  //       message: 'Forbidden',
  //       description: data.message
  //     })
  //   }
  //   if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
  //     notification.error({
  //       message: 'Unauthorized',
  //       description: 'Authorization verification failed'
  //     })
  //     if (token) {
  //       store.dispatch('Logout').then(() => {
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 1500)
  //       })
  //     }
  //   }
  // }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  // const token = storage.get(ACCESS_TOKEN)
  // // 如果 token 存在
  // // 让每个请求携带自定义 token 请根据实际情况自行修改
  // if (token) {
  //   config.headers[ACCESS_TOKEN] = token
  // }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const { data, config } = response
  const url = config.url ?? ''
  if (!data) {
    notification.error({
      message: 'error',
      description: '服务异常'
    })
  }
  const code = data.code
  if (code === 40100 && !url.includes('user/login')) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
    throw new Error('请先登录')
  }
  if (code !== 0) {
        notification.error({
          message: 'Forbidden',
          description: data.message
        })
  }
  return data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
