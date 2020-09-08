import request from '@/util/request'

export function get() {
  return request({
    url: '/dev-api/vue-element-admin/user/login',
    method: 'get',
    data
  })
}

export function post(data) {
  return request({
    url: '/dev-api/vue-element-admin/user/login',
    method: 'post',
    data
  })
}
