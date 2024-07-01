<script setup lang="ts">
import { type TagItem, TagType } from './typing'

/*
  green: { color: '#00CE84', bgcolor: 'rgba(0, 206, 132, 0.05)' },
  red: { color: '#FF4960', bgcolor: 'rgba(255, 73, 96, 0.05)' },
  blue: { color: '#1998FF', bgcolor: 'rgba(25, 152, 255, 0.05)' },
  gold: { color: '#DB9030', bgcolor: 'rgba(219, 144, 48, 0.05)' },
  gray: { color: 'rgba(0, 0, 0, 0.5)', bgcolor: 'rgba(0, 0, 0, 0.03)' },
*/

const props = defineProps<TagItem>()
const tagClass = computed(() => {
  switch (props.type) {
    case TagType.GRAY:
      return `text-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.03)]`
    case TagType.GREEN:
      return `text-[#00CE84] bg-[rgba(0,206,132,0.05)]`
    case TagType.RED:
      return `text-[#FF4960] bg-[rgba(255,73,96,0.05)]`
    case TagType.BLUE:
      return `text-[#1998FF] bg-[rgba(25,152,255,0.05)]`
    case TagType.GOLD:
      return `text-[#DB9030] bg-[rgba(219,144,48,0.05)]`
    default:
      // gray
      return `text-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.03)]`
  }
})
</script>

<template>
  <div :class="tagClass" class="inline-block p-x-4 p-y-2 text-center text-12">
    {{ tag }}
  </div>
</template>
