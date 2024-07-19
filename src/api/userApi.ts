import type { LoginUser } from '@/stores/modules/types'
import request from '@/utils/request'

export async function login(params): Promise<any> {
  return request({
    method: 'post',
    url: '/login',
    data: params,
  })
}

export async function registerUser(params): Promise<any> {
  return request({
    method: 'post',
    url: '/register',
    data: params,
  })
}

export async function addChild(params): Promise<any> {
  return request({
    method: 'post',
    url: '/user/add/child',
    data: params,
  })
}

export async function updateUser(params): Promise<any> {
  return request({
    method: 'post',
    url: '/user/update',
    data: params,
  })
}

export async function queryUserInfo(): Promise<LoginUser> {
  return request({
    method: 'get',
    url: '/user/query',
  })
}

export async function queryIntegral(): Promise<number> {
  return request({
    method: 'get',
    url: '/user/integral/query',
  })
}

export async function queryIntegralRecords(query): Promise<number> {
  return request({
    method: 'post',
    url: '/user/integral/record/query',
    data: query,
  })
}

export async function queryUserChildren(): Promise<any> {
  return request({
    method: 'get',
    url: '/user/children/query',

  })
}
