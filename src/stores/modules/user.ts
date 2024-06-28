import { defineStore } from 'pinia'
import { EXCHANGE_RATIO, LoginUser, UserType } from './types'
import { login, queryIntegral } from '@/api/userApi'

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

  async function toLogin(data) {
    const result = await login(data)
    if (!result.exchangeRatio) {
      result.exchangeRatio = EXCHANGE_RATIO
    }
    user.value = result
  }

  return {
    user,
    token,
    parentTypeFlag,
    loginOut,
    updateIntegral,
    toLogin,
  }
}, {
  persist: true,
})

export default useUserStore
