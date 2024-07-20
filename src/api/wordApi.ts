import type { PageResult } from './typing'
import request from '@/utils/request'

export async function wordQueryList(query): Promise<PageResult> {
  return request({
    method: 'post',
    url: `/word/query`,
    data: query,
  })
}
