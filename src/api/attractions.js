import request from '@/utils/request'
import qs from 'qs'
const attractionsApi = {
  getById: '/attractions',
  findAttractionsNearby: '/attractions/nearby',
  getByName: '/attractions/getByName',
  listPage: '/attractions/list/page',
  add: '/attractions/add',
  update: '/attractions/update',
  delete: '/attractions'
}

export function getAttractionById (id) {
  return request({
    url: `${attractionsApi.getById}/${id}`,
    method: 'get'
  })
}

export function findAttractionsNearby (params) {
  return request({
    url: attractionsApi.findAttractionsNearby,
    method: 'get',
    params: params
  })
}

export function getAttractionsByName (names) {
  return request({
    url: attractionsApi.getByName,
    method: 'post',
    data: names
  })
}

export function list (params = {}) {
  return request({
    url: attractionsApi.listPage,
    method: 'post',
    data: params
  })
}

export function add (attractionData) {
  return request({
    url: attractionsApi.add,
    method: 'post',
    data: attractionData
  })
}

export function update (attractionData) {
  return request({
    url: attractionsApi.update,
    method: 'post',
    data: attractionData
  })
}

export function Delete (ids) {
  return request({
    url: attractionsApi.delete,
    method: 'delete',
    params: ids,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

// export function Delete (parameter) {
//   return request({
//     url: attractionsApi.Delete,
//     method: 'post',
//     data: parameter
//   })
// }
