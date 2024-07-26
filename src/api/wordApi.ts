import axios from 'axios'
import md5 from 'md5'
import type { PageResult } from './typing'
import type { Word } from '@/pages/words/typing'
import request from '@/utils/request'

export async function wordQueryList(query): Promise<PageResult> {
  return request({
    method: 'post',
    url: `/word/query`,
    data: query,
  })
}

export async function wordQueryStat(): Promise<number[]> {
  return request({
    method: 'get',
    url: '/word/stat/query',
  })
}

export async function wordAdd(params: Word): Promise<number> {
  return request({
    method: 'post',
    url: `/word/add`,
    data: params,
  })
}

export async function wordUpdate(params: Word): Promise<string> {
  return request({
    method: 'post',
    url: `/word/update`,
    data: params,
  })
}

export async function wordRemove(id: number): Promise<string> {
  return request({
    method: 'get',
    url: `/word/remove/${id}`,
  })
}

export async function wordTranslate(keyword: string) {
  const url = '/api/trans/vip/translate'
  const appId = '20240721002104869'
  const key = '3TD9vOYIDTHR0NWk8q80'
  const salt = Date.now()
  const sign = md5(appId + keyword + salt + key)
  const result = await axios.get(`${url}?q=${keyword}&appid=${appId}&salt=${salt}&from=en&to=zh&sign=${sign}`)
  if (result.status === 200) {
    const data = result.data.trans_result[0]
    if (data) {
      const { dst, src } = data
      if (dst === src)
        return ''
      return dst
    }
    return ''
  }
}
