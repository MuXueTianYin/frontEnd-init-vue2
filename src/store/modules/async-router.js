/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/config/router.config'
// eslint-disable-next-line no-unused-vars

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // GenerateRoutes ({ commit }, data) {
    //   return new Promise((resolve, reject) => {
    //     const { token } = data
    //     generatorDynamicRouter(token).then(routers => {
    //       commit('SET_ROUTERS', routers)
    //       resolve()
    //     }).catch(e => {
    //       reject(e)
    //     })
    //   })
    // }
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        // eslint-disable-next-line no-undef
        commit('SET_ROUTERS', asyncRouterMap) // 直接使用所有异步路由
        resolve()
      })
    }
  }
}

export default permission
