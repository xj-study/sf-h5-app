import type { ModelRef } from 'vue'

export default function useRulesForm<T, E>(rules: ModelRef<E>, options: {
  initData: () => T
  parseRules?: (E) => T
  getRules?: (T) => E
}) {
  const formData = ref<T>()

  if (!options.parseRules)
    options.parseRules = E => E
  if (!options.getRules)
    options.getRules = T => T

  watchEffect(() => {
    let data = options.initData()
    if (rules.value) {
      data = options.parseRules(rules.value)
    }
    formData.value = data
  })
  function onUpdate() {
    rules.value = options.getRules(formData.value)
  }
  return { formData, onUpdate }
}
