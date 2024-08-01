<script setup lang="ts">
import { type TagItem, getTagValue } from './typing'

interface Props {
  list: TagItem[]
  tagCls?: string
  clear?: boolean
}
const props = withDefaults(defineProps<Props>(), { clear: true })
const selectTag = defineModel<number>()

function toSelect(index, item: TagItem) {
  const value = getTagValue(index, item)
  if (props.clear && selectTag.value === value) {
    selectTag.value = null
  } else {
    selectTag.value = value
  }
}
function checkSelect(index, item: TagItem) {
  const value = getTagValue(index, item)
  return value === selectTag.value
}
const tagClsFinal = computed(() => {
  if (props.tagCls) {
    return props.tagCls
  }
  return 'text-16'
})
</script>

<template>
  <div>
    <base-tag v-for="(item, index) in list" :key="index" class="mr-8 min-w-20" :class="tagClsFinal" v-bind="item" :select="checkSelect(index, item)" @click="toSelect(index, item)" />
  </div>
</template>
