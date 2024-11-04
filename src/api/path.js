import request from '@/utils/request'

const pathApi = {
  findShortestPath: '/paths/shortest',
  add: '/paths/add',
  update: '/paths/update',
  recommendations: '/paths/recommendations'
}

export function findShortestPath (Data) {
  return request({
    url: pathApi.findShortestPath,
    method: 'post',
    data: Data
  })
}
export function recommendations (params) {
  return request({
    url: pathApi.recommendations,
    method: 'get',
    params: params
  })
}

export function add (Data) {
  return request({
    url: pathApi.add,
    method: 'post',
    data: Data
  })
}

export function update (Data) {
  return request({
    url: pathApi.update,
    method: 'post',
    data: Data
  })
}
