import request from '@/utils/request'
import qs from 'qs'
const hotelsApi = {
  getById: '/hotels',
  findHotelsNearby: '/hotels/nearby/hotels',
  getByName: '/hotels/getByName',
  listPage: '/hotels/list/page',
  add: '/hotels/add',
  update: '/hotels/update',
  delete: '/hotels'
}

export function getHotelById (id) {
  return request({
    url: `${hotelsApi.getById}/${id}`,
    method: 'get'
  })
}

export function findHotelsNearby (params) {
  return request({
    url: hotelsApi.findHotelsNearby,
    method: 'get',
    params: params
  })
}

export function getHotelsByName (names) {
  return request({
    url: hotelsApi.getByName,
    method: 'post',
    data: names
  })
}

export function list (params = {}) {
  return request({
    url: hotelsApi.listPage,
    method: 'post',
    data: params
  })
}

export function add (hotelData) {
  return request({
    url: hotelsApi.add,
    method: 'post',
    data: hotelData
  })
}

export function update (hotelData) {
  return request({
    url: hotelsApi.update,
    method: 'post',
    data: hotelData
  })
}

export function Delete (ids) {
  return request({
    url: hotelsApi.delete,
    method: 'delete',
    params: ids,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
// export function Delete (parameter) {
//   return request({
//     url: hotelsApi.Delete,
//     method: 'post',
//     data: parameter
//   })
// }
