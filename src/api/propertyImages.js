import request from '@/utils/request'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
const propertyimagesApi = {
  list: '/propertyimages/list/page',
  add: '/propertyimages/add',
  update: '/propertyimages/update',
  Delete: '/propertyimages',
  propertyimages: '/propertyimages'
}
export function list (parameter) {
  return request({
    url: propertyimagesApi.list,
    method: 'post',
    data: parameter
  })
}
export function getById (parameter) {
  return request({
    url: propertyimagesApi.propertyimages + '/' + parameter,
    method: 'get'
    // params: parameter
  })
}
export function update (parameter) {
  return request({
    url: propertyimagesApi.update,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function add (parameter) {
  return request({
    url: propertyimagesApi.add,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function Delete (parameter) {
  return request({
    url: propertyimagesApi.Delete,
    method: 'delete',
    params: parameter,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
// export function Delete (parameter) {
//   return request({
//     url: propertyimagesApi.Delete,
//     method: 'post',
//     data: parameter
//   })
// }
