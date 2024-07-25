import request from '@/utils/request'

export async function quesQuery(id, type): Promise<any> {
  return request({
    method: 'post',
    url: '/ques/query',
    data: { id, type },
  })
}

export async function quesSubmit(answers): Promise<any> {
  //
  return request({
    method: 'post',
    url: '/ques/submit',
    data: answers,
  })
}
