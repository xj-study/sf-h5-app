import request from '@/utils/request'

export async function orderBuy(id: number, type: number): Promise<any> {
  return request({
    method: 'post',
    url: '/order/buy',
    data: { id, type },
  })
}
