export default function useMainPage() {
  const mainPageRef = ref(null)
  const listRef = computed(() => mainPageRef.value.listRef)
  const onRefresh = () => listRef.value.onRefresh()
  const listUpdate = (...args) => listRef.value.update(...args)
  return { mainPageRef, listRef, onRefresh, listUpdate }
}
