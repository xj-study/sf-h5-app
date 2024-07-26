<script setup lang="ts">
import { type Word, WordLevels } from '../typing'

interface Props {
  item: Word
}
const props = defineProps<Props>()

const emits = defineEmits(['select', 'remove'])
const levelTagData = computed(() => {
  return WordLevels[props.item.level]
})
function toSelect() {
  emits('select', props.item)
}
function toRemove() {
  emits('remove', props.item)
}
</script>

<template>
  <div class="m-10 flex justify-between p-10" :class="item.select ? 'bg-[rgba(219,144,48,0.05)]' : 'bg-white'">
    <div class="grow">
      <div class="flex items-center">
        <base-tag v-bind="levelTagData" class="mr-8" />
        <span class="mr-8 text-18 font-bold"> {{ item.enValue }} </span>
        <base-sound :word="item.enValue" class="scale-80" />
      </div>
      <div class="mt-8">
        {{ item.zhValue }}
      </div>
    </div>
    <div>
      <base-button size="small" @click="toRemove">
        删除
      </base-button>
      <base-button v-show="!item.select" size="small" class="ml-4" @click="toSelect">
        选中
      </base-button>
    </div>
  </div>
</template>
