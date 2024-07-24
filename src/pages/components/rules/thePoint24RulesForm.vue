<script setup lang="ts">
import type { RulesGamePoint24 } from './typing'
import useRulesForm from './useRulesForm'

const rules = defineModel<string>()
const initData = () => ({ count: 4 })
const { formData, onUpdate } = useRulesForm<RulesGamePoint24, string>(rules, {
  initData,
  parseRules: (val) => {
    const result = JSON.parse(val)
    if (result.count == null)
      return initData()
    return result
  },
  getRules: JSON.stringify,
})
</script>

<template>
  <div>
    <van-field
      v-model="formData.count"
      label="题目数量"
      placeholder="题目数量"
      type="number"
      clearable
      :rules="[{ required: true, message: '请填写题目数量' }]"
      @update:model-value="onUpdate"
    />
  </div>
</template>
