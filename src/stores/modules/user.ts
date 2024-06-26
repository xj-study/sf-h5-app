import { defineStore } from 'pinia'

enum UserType {
  CHILD = 1,
  PARENT = 2,
}

const useUserStore = defineStore('user', () => {
  const user = ref({ type: UserType.CHILD })
  const token = ref('')
  const parentTypeFlag = computed(() => user.value.type === UserType.PARENT)
  return {
    user,
    token,
    parentTypeFlag,
  }
}, {
  persist: true,
})

export default useUserStore
