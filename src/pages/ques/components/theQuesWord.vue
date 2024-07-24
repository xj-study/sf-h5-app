<script setup lang="ts">
import { isQuesWordTypeSelect } from '../quesUtils'
import type { QuesWordData } from '../typing'
import TheQuesWordFill from './theQuesWordFill.vue'
import TheQuesWordItem from './theQuesWordItem.vue'
import TheQuesWordOptions from './theQuesWordOptions.vue'

const props = defineProps<{ item: QuesWordData }>()
const isTypeSelect = computed(() => isQuesWordTypeSelect(props.item.type))
</script>

<template>
  <div v-if="item">
    <TheQuesWordItem :type="item.type" :zh-value="item.zhValue" :en-value="item.enValue" />
    <TheQuesWordOptions v-if="isTypeSelect" :list="item.optionList" />
    <TheQuesWordFill v-else />
  </div>
</template>
