export default function useLoading(callback: (...any) => Promise<any>) {
  const loadingFlag = ref(false)
  async function loading(...params: any) {
    loadingFlag.value = true
    try {
      const result = await callback(...params)
      loadingFlag.value = false
      return result
    } catch (error) {
      loadingFlag.value = false
    }
  }
  return { loadingFlag, loading }
}
