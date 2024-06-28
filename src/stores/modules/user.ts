import { defineStore } from 'pinia'
import { LoginUser, UserType } from './types'
import { queryIntegral } from '@/api/userApi'

const useUserStore = defineStore('user', () => {
  const user = ref(new LoginUser())

  const parentTypeFlag = computed(() => user.value.type === UserType.PARENT)
  const token = computed(() => user.value.token)

  const router = useRouter()
  async function loginOut() {
    user.value = new LoginUser()
    router.push('/')
  }
  // 更新积分
  async function updateIntegral() {
    const integral = await queryIntegral()
    user.value.integral = integral
  }

  return {
    user,
    token,
    parentTypeFlag,
    loginOut,
    updateIntegral,
  }
}, {
  persist: true,
})

export default useUserStore
