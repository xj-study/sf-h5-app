<script setup lang="ts">
import type { TabItem } from './typing'

interface Props {
  modelValue: number
  list: TabItem[]
  [key: string]: any
}

withDefaults(defineProps<Props>(), {
  list: () => [],
})

const emits = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()

function onChange(value) {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<template>
  <van-tabs v-bind="attrs" :active="modelValue" title="" @change="onChange">
    <van-tab v-for="data in list" :key="data.value" :title="data.title" :name="data.value" />
  </van-tabs>
</template>
