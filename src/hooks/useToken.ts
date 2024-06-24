import { getToken } from '@/utils/token'
import router from '@/router'

export default function useToken(callback: Function, ...args: any[]) {
  const token = getToken()

  if (token && callback) {
    // callback.apply(null, args)
    callback(...args)
  } else {
    // to login
    router.push('/login')
  }
}
