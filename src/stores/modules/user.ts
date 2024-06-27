import { defineStore } from 'pinia'

enum UserType {
  INIT = 0,
  CHILD = 1,
  PARENT = 2,
}

const useUserStore = defineStore('user', () => {
  const user = ref({ type: UserType.INIT, token: '', userName: '用户' })

  const parentTypeFlag = computed(() => user.value.type === UserType.PARENT)
  const token = computed(() => user.value.token)
  return {
    user,
    token,
    parentTypeFlag,
  }
}, {
  persist: true,
})

export default useUserStore
