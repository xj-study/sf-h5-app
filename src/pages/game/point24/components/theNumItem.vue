<script setup lang="ts">
import { Fraction, type INumData } from '../typing'
import TheFractionItem from './theFractionItem.vue'

const props = defineProps<INumData>()

const cls = computed(() => {
  let result = 'h-80 w-80 border-2 border-solid text-center text-32 leading-80'
  if (props.disabed) {
    result += ' bg-neutral-300/45 text-gray'
  } else if (props.select) {
    result += ' bg-sky-500/45'
  } else {
    result += ' bg-[rgba(0,0,0,0.8)]'
  }
  return result
})

const fracFlag = computed(() => props.num instanceof Fraction)
const fracData = computed(() => {
  if (fracFlag.value)
    return (props.num as Fraction)
  return null
})
</script>

<template>
  <div :class="cls">
    <div v-if="fracFlag" class="mt-8 inline-block vertical-top">
      <TheFractionItem :data="fracData" />
    </div>
    <span v-else>{{ num }}
    </span>
  </div>
</template>
