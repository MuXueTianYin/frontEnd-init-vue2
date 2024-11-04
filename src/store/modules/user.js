import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { getGetLogin, getInfo, login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import info from '@/utils/user'
storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          console.log(result)
          if (result.code === 0) {
            storage.set(ACCESS_TOKEN, 'result.token', new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            resolve()
          }
          reject(result.message)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        getInfo().then(response => {
          const { data, code } = response
          if (code === 0) {
            const role = { ...info }
            console.log(response, info, 'response')
            role.permissions = info.permissions.map(permission => {
              return {
                ...permission,
                actionList: (permission.actionEntitySet || {}).map(item => item.action)
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            // 覆盖响应体的 role, 供下游使用
            data.role = role
            console.log(response, 'response')
            commit('SET_INFO', data)
            commit('SET_ROLES', data.userRole)
            commit('SET_NAME', { name: data.userName, welcome: welcome() })
            commit('SET_AVATAR', data.userAvatar)
            resolve(response)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getGetLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        getGetLogin().then(res => {
          if (res.code === 0) {
            resolve(res)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          console.log(error, 'getGetLogin')
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
