<script setup lang="ts">
import { type RulesLearnEng, initLearnEngWord } from './typing'
import useRulesForm from './useRulesForm'
import theLearnEngWordItem from './theLearnEngWordItem.vue'

interface Props {
  list: RulesLearnEng[]
}

const rules = defineModel<string>()
const initData = () => ({ list: [initLearnEngWord()] })
const { formData, onUpdate } = useRulesForm<Props, string>(rules, {
  initData,
  parseRules: (val) => {
    const result = JSON.parse(val)
    if (result.list == null) {
      return initData()
    }
    return result
  },
  getRules: JSON.stringify,
})

function toAdd() {
  formData.value.list.push(initLearnEngWord())
}
</script>

<template>
  <div>
    <theLearnEngWordItem
      v-for="_, index in formData.list"
      :key="index"
      v-model="formData.list[index]" @update:model-value="onUpdate"
    />
    <base-button class="" type="primary" size="small" icon="add" @click="toAdd">
      新增规则
    </base-button>
  </div>
</template>
