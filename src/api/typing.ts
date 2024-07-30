export enum ResponseCode {
  SUCCESS = 0,
  LOGIN_STATE_INVALID = 30007, // token 失效
}

export interface TaskRecordQuery {
  id?: number | string
  status?: number | string
  date?: number
  tab?: number
  keyword?: string
}

export interface ResponseBody<T = any> {
  code?: number
  level?: number
  msg?: string
  data?: T
  ok: boolean
}

/** 统一返回结构体 */

export interface PageResult<T = any> {
  records: T[]
  num?: number
  size?: number
  pages?: number
  total?: number

}
