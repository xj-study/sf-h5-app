<script setup lang="ts">
import type { StoryLevelItem } from '../../typing'

interface Props {
  item: StoryLevelItem
}
const props = defineProps<Props>()
const emits = defineEmits(['edit', 'remove'])
function toEdit() {
  emits('edit', props.item)
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <span> {{ item.title }} </span>
      </div>
      <div v-if="item.prize">
        <span>奖励：</span>
        <span class="text-20 text-amber-500">{{ item.prize }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <base-button size="small" plain type="primary" class="min-w-80" @click.stop="toEdit">
        修改
      </base-button>
    </div>
  </div>
</template>
