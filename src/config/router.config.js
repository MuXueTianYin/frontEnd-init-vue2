// eslint-disable-next-line
import { UserLayout, BasicLayout} from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/PropertyImages',
        name: 'PropertyImages',
        component: () => import('@/views/propertyImages/PropertyImages'),
        hidden: true,
        meta: { title: 'menu.PropertyImages', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/nearby',
        name: 'nearby',
        component: RouteView,
        redirect: '/nearby/nearby',
        meta: { title: 'menu.nearby', icon: 'profile' },
        children: [
          {
            path: '/nearby/nearby',
            name: 'nearby',
            component: () => import('@/views/nearby/Nearby'),
            meta: { title: 'menu.nearby.Nearby' }
          }
        ]
      },
      {
        path: '/attractions',
        name: 'attractions',
        component: RouteView,
        redirect: '/attractions/attractions',
        meta: { title: 'menu.Attractions', icon: 'profile' },
        children: [
          {
            path: '/attractions/attractions',
            name: 'Attractions',
            component: () => import('@/views/attractions/Attractions'),
            meta: { title: 'menu.attractions.Attractions' }
          }
        ]
      },
      {
        path: '/hotels',
        name: 'hotels',
        component: RouteView,
        redirect: '/hotels/hotels',
        meta: { title: 'menu.hotels', icon: 'profile' },
        children: [
          {
            path: '/hotels/hotels',
            name: 'hotels',
            component: () => import('@/views/Hotels/Hotels'),
            meta: { title: 'menu.hotels.Hotels' }
          }
        ]
      },
      // tenement
      {
        path: '/tenement',
        name: 'tenement',
        component: RouteView,
        redirect: '/tenement/properties',
        meta: { title: 'menu.tenement', icon: 'profile' },
        children: [
          {
            path: '/tenement/properties',
            name: 'TenementBasic',
            component: () => import('@/views/properties/Properties'),
            meta: { title: 'menu.tenement.properties' }
          }
        ]
      },
      {
        path: '/lease',
        name: 'lease',
        component: RouteView,
        redirect: '/lease/contract',
        meta: { title: 'menu.lease', icon: 'profile' },
        children: [
          {
            path: '/lease/contract',
            name: 'leaseContract',
            component: () => import('@/views/Leases/Leases'),
            meta: { title: 'menu.lease.contract' }
          }
        ]
      },
      {
        path: '/management',
        name: 'management',
        component: RouteView,
        redirect: '/management/tenant',
        meta: { title: 'menu.management', icon: 'profile' },
        children: [
          {
            path: '/management/tenant',
            name: 'tenantManagement',
            component: () => import('@/views/tenement/Tenant'),
            meta: { title: 'menu.management.tenant' }
          }
          // {
          //   path: '/management/landlord',
          //   name: 'landlordManagement',
          //   component: () => import('@/views/profile/advanced/Advanced'),
          //   meta: { title: 'menu.management.landlord' }
          // }
        ]
      },
      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
