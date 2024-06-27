import request from '@/utils/request'

export async function login(params): Promise<any> {
  return request({
    method: 'post',
    url: '/login',
    data: params,
  })
}
