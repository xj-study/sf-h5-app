<script setup lang="ts">
import type { TagItem } from './typing'

interface Props {
  list: TagItem[]
  modelValue?: number
}
withDefaults(defineProps<Props>(), { modelValue: 0 })
const emits = defineEmits(['update:modelValue'])
function toSelect(index) {
  emits('update:modelValue', index)
}
</script>

<template>
  <div>
    <base-tag v-for="(item, index) in list" :key="index" class="mr-8 min-w-20 text-16" v-bind="item" :select="index === modelValue" @click="toSelect(index)" />
  </div>
</template>
