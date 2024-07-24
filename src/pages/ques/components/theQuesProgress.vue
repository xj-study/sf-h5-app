<script setup lang="ts">
import type { QuesAnswerData } from '../typing'

interface Props {
  answers: QuesAnswerData[]
}
defineProps<Props>()

const current = defineModel()
function getItemCls(index) {
  const result = []
  if (current.value === index) {
    result.push('scale-150')
  }
  return result
}
</script>

<template>
  <div class="flex">
    <div
      v-for="_, index in answers"
      :key="index" :class="getItemCls(index)"
      class="m-8 h-20 w-20 border-[rgba(255,255,255,.2)] border-solid text-center text-14 leading-20 transition-duration-100"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>
