export interface FormProp<T> {
  confirmLoading: boolean
  itemData: T | null
}

export interface UseFormOptions<T> {
  init: () => T
  getItemData: () => T
}

export default function useForm<T extends object>(options: UseFormOptions<T>) {
  const form = reactive<T>(options.init())
  const itemData = computed(() => options.getItemData())

  watchEffect(() => {
    const defaultData = options.init()
    for (const key in form) {
      if (itemData.value) {
        form[key] = itemData.value[key]
      } else {
        form[key] = defaultData[key]
      }
    }
  })

  return { form }
}
