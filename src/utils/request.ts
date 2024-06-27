import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify, showToast } from 'vant'

import { type ResponseBody, ResponseCode } from '@/api/typing'
import useUserStore from '@/stores/modules/user'

import router from '@/router'

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'token'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.message) || statusText,
      })
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
    showToast('系统异常')
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const userStore = useUserStore()
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  if (userStore.token) {
    config.headers[REQUEST_TOKEN_KEY] = userStore.token
  }

  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: ResponseBody }) {
  const data = response.data
  if (data.code === ResponseCode.SUCCESS) {
    // 请求成功
    return data.data
  } else {
    if (data.code === ResponseCode.LOGIN_STATE_INVALID) {
      router.push('/login')
    }
    showToast(data.msg)
    throw new Error('服务异常')
  }
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request
