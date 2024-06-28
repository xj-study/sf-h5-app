import type { GiftForm } from '@/pages/gift/typing'
import request from '@/utils/request'

export async function giftQuery(): Promise<any> {
  return request({
    method: 'get',
    url: '/gift/query',
  })
}

export async function giftUpdate(data: GiftForm): Promise<any> {
  return request({
    method: 'post',
    url: '/gift/update',
    data,
  })
}

export async function giftAdd(data: GiftForm): Promise<any> {
  return request({
    method: 'post',
    url: '/gift/add',
    data,
  })
}

export async function giftExchange(id: number): Promise<any> {
  return request({
    method: 'post',
    url: '/gift/exchange',
    data: { id },
  })
}
