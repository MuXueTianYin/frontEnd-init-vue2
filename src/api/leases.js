import request from '@/utils/request'
import qs from 'qs'
const tenantApi = {
  list: '/leases/list/page',
  add: '/leases/add',
  update: '/leases/update',
  Delete: '/leases'
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
