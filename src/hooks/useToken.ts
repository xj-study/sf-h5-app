import router from '@/router'
import useUserStore from '@/stores/modules/user'

export default function useToken(callback: Function, ...args: any[]) {
  const token = useUserStore().token

  if (token && callback) {
    // callback.apply(null, args)
    callback(...args)
  } else {
    // to login
    router.push('/login')
  }
}
