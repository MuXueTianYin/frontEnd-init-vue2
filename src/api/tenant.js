import request from '@/utils/request'
import qs from 'qs'
const tenantApi = {
  list: '/tenant/list/page',
  add: '/tenant/add',
  update: '/tenant/update',
  Delete: '/tenant'
}
export function list (parameter) {
  return request({
    url: tenantApi.list,
    method: 'post',
    data: parameter
  })
}
export function add (parameter) {
  return request({
    url: tenantApi.add,
    method: 'post',
    data: parameter
  })
}
export function update (parameter) {
  return request({
    url: tenantApi.update,
    method: 'post',
    data: parameter
  })
}
export function Delete (parameter) {
  return request({
    url: tenantApi.Delete,
    method: 'delete',
    params: parameter,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
// export function Delete (parameter) {
//   return request({
//     url: tenantApi.Delete,
//     method: 'post',
//     data: parameter
//   })
// }
