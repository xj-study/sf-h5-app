export default function useLoading(callback: (...any) => Promise<any>) {
  const loadingFlag = ref(false)
  async function loading(...params: any) {
    loadingFlag.value = true
    const result = await callback(...params)
    loadingFlag.value = false
    return result
  }
  return { loadingFlag, loading }
}
