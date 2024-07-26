<script setup lang="ts">
import type { Word } from '@/pages/words/typing'

defineProps<{ list: Word[] }>()
const select = defineModel()

const itemCls = 'backdrop-blur mb-20 border-gray border-1 border-solid p-x-8 p-y-10'

function toSelect(idx) {
  select.value = idx
}

function getItemSelectCls(index) {
  let result = itemCls
  result += index === select.value ? ' bg-[rgba(255,255,255,.02)]' : ' bg-[rgba(0,0,0,0.4)]'
  return result
}
</script>

<template>
  <div>
    <div v-for="item, index in list" :key="index" :class="getItemSelectCls(index)" @click="toSelect(index)">
      {{ item.zhValue }}
    </div>
  </div>
</template>
