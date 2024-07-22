<script setup lang="ts">
import type { Word } from '../typing'
import { TagType } from '@/components/typing'

interface Props {
  item: Word
}
const props = defineProps<Props>()
const tagTypes = [TagType.GRAY, TagType.GREEN, TagType.BLUE, TagType.GOLD, TagType.RED]
const levelTagData = computed(() => {
  const tag = props.item.level
  return { tag: `${tag}`, type: tagTypes[tag - 1] }
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
