import type { OrderStatus } from '@/pages/order/typing'
import request from '@/utils/request'

export async function orderBuy(data): Promise<any> {
  return request({
    method: 'post',
    url: '/order/gift/buy',
    data,
  })
}
export async function orderQuery(data): Promise<any> {
  return request({
    method: 'post',
    url: '/order/gift/query',
    data,
  })
}

export async function orderUpdateStatus(orderId: number, status: OrderStatus): Promise<any> {
  return request({
    method: 'get',
    url: `/order/gift/${orderId}/${status}/update`,

  })
}
