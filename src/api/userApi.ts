import request from '@/utils/request'

export async function login(params): Promise<any> {
  return request({
    method: 'post',
    url: '/login',
    data: params,
  })
}

export async function queryIntegral(): Promise<number> {
  return request({
    method: 'get',
    url: '/user/integral/query',
  })
}

export async function queryIntegralRecords(): Promise<number> {
  return request({
    method: 'get',
    url: '/user/integral/record/query',
  })
}

export async function queryUserChildren(): Promise<any> {
  return request({
    method: 'get',
    url: '/user/children/query',

  })
}
