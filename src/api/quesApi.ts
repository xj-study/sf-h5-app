import request from '@/utils/request'

export async function quesQuery(id, type): Promise<any> {
  return request({
    method: 'post',
    url: '/ques/query',
    data: { id, type },
  })
}
