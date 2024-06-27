import request from '@/utils/request'

export async function recordQuery(): Promise<any> {
  return request({
    method: 'get',
    url: '/task/record/query',
    data: {

    },
  })
}
export async function recordComplete(id: number): Promise<any> {
  return request({
    method: 'get',
    url: `/task/record/complete/${id}`,
  })
}

export async function recordCompleteByTaskId(taskId: number): Promise<any> {
  return request({
    method: 'post',
    url: `/task/record/complete`,
    data: {
      taskId,
    },
  })
}
