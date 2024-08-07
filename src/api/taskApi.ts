import type { TaskRecordQuery } from './typing'
import type { TaskForm } from '@/pages/task/types'
import request from '@/utils/request'

export async function recordQuery(data: TaskRecordQuery): Promise<any> {
  return request({
    method: 'post',
    url: '/task/record/query',
    data,
  })
}
export async function recordComplete(id: number): Promise<any> {
  return request({
    method: 'get',
    url: `/task/record/complete/${id}`,
  })
}

export async function recordCompleteByTaskId(taskId: number, date: number): Promise<any> {
  return request({
    method: 'post',
    url: `/task/record/complete`,
    data: {
      taskId,
      date,
    },
  })
}

export async function taskQuery(): Promise<any> {
  return request({
    method: 'get',
    url: '/task/query',
  })
}

export async function taskAdd(data: TaskForm): Promise<number> {
  return request({
    method: 'post',
    url: '/task/add',
    data,
  })
}
export async function taskUpdate(data: TaskForm): Promise<any> {
  return request({
    method: 'post',
    url: '/task/update',
    data,
  })
}
