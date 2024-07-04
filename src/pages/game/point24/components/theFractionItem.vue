<script setup lang="ts">
import type { Fraction } from '../typing'

interface Props {
  data: Fraction
}
const props = defineProps<Props>()

const borderStyle = 'inline-block border border-2 p-2'
const numBigger = computed(() => props.data.numerator > props.data.denominator)
const numCls = computed(() => numBigger.value ? `${borderStyle} border-b-solid` : '')
const denCls = computed(() => numBigger.value ? '' : `${borderStyle} border-t-solid`)
</script>

<template>
  <div class="text-28 leading-none">
    <div :class="numCls">
      {{ data.numerator }}
    </div>
    <div :class="denCls">
      {{ data.denominator }}
    </div>
  </div>
</template>
