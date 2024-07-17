<script setup lang="ts">
import type { StoryLevelItem } from '../../typing'
import { type TagItem, TagType } from '@/components/typing'

// import type { StoryItem } from '../typing'

interface Props {
  item: StoryLevelItem

}
const props = defineProps<Props>()
const emits = defineEmits(['start'])
const tagItem = computed<TagItem>(() => {
  const tag: number = props.item.levelOrder
  return { type: TagType.GREEN, tag: `${tag}` }
})
const isActive = inject('isActive')
function toStart() {
  emits('start', props.item)
}
const isPass = computed(() => props.item.pass)
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag v-bind="tagItem" class="mr10" />
        <span> {{ item.title }} </span>
      </div>
      <div v-if="!isPass" class="text-14">
        <span> 奖励：</span>
        <span class="text-20 text-amber-500">{{ item.prize || 0 }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <div v-if="isPass" class="color-green-700">
        <span>已通关</span>
        <span v-if="item.prize">，并获得 <span class="text-amber-500">{{ item.prize }}</span> 积分</span>
      </div>
      <base-button v-else :disabled="!isActive" size="small" plain type="primary" class="min-w-80" @click.stop="toStart">
        挑战
      </base-button>
    </div>
  </div>
</template>
