<script setup lang="ts">
import { type Word, WordLevels } from '../typing'

interface Props {
  item: Word
}
const props = defineProps<Props>()

const levelTagData = computed(() => {
  return WordLevels[props.item.level]
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex">
      <base-tag v-bind="levelTagData" class="mr-8" />
      <span class="text-18 font-bold"> {{ item.enValue }} </span>
    </div>
    <div class="mt-8">
      {{ item.zhValue }}
    </div>
  </div>
</template>
