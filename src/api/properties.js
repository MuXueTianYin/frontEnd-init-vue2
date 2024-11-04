import request from '@/utils/request'
import qs from 'qs'
const propertiesApi = {
  list: '/properties/list/page',
  add: '/properties/add',
  update: '/properties/update',
  Delete: '/properties'
}
export function list (parameter) {
  return request({
    url: propertiesApi.list,
    method: 'post',
    data: parameter
  })
}
export function add (parameter) {
  return request({
    url: propertiesApi.add,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function update (parameter) {
  return request({
    url: propertiesApi.update,
    method: 'post',
    data: parameter
  })
}
export function Delete (parameter) {
  return request({
    url: propertiesApi.Delete,
    method: 'delete',
    params: parameter,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
// export function Delete (parameter) {
//   return request({
//     url: propertiesApi.Delete,
//     method: 'post',
//     data: parameter
//   })
// }
