import { defineStore } from 'pinia'
import { LoginUser, UserType } from './types'

const useUserStore = defineStore('user', () => {
  const user = ref(new LoginUser())

  const parentTypeFlag = computed(() => user.value.type === UserType.PARENT)
  const token = computed(() => user.value.token)

  const router = useRouter()
  async function loginOut() {
    user.value = new LoginUser()
    router.push('/')
  }
  return {
    user,
    token,
    parentTypeFlag,
    loginOut,
  }
}, {
  persist: true,
})

export default useUserStore
