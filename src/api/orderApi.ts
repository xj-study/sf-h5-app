import request from '@/utils/request'

export async function orderBuy(data): Promise<any> {
  return request({
    method: 'post',
    url: '/order/gift/buy',
    data,
  })
}
