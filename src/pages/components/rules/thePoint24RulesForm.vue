<script setup lang="ts">
import type { GamePoint24 } from './typing'
import useRulesForm from './useRulesForm'

const rules = defineModel<string>()
const { formData, onUpdate } = useRulesForm<GamePoint24, string>(rules, {
  initData: () => ({ count: 4 }),
  parseRules: JSON.parse,
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
