<script setup lang="ts">
import { type TagItem, TagType } from './typing'

/*
  green: { color: '#00CE84', bgcolor: 'rgba(0, 206, 132, 0.05)' },
  red: { color: '#FF4960', bgcolor: 'rgba(255, 73, 96, 0.05)' },
  blue: { color: '#1998FF', bgcolor: 'rgba(25, 152, 255, 0.05)' },
  gold: { color: '#DB9030', bgcolor: 'rgba(219, 144, 48, 0.05)' },
  gray: { color: 'rgba(0, 0, 0, 0.5)', bgcolor: 'rgba(0, 0, 0, 0.03)' },
*/

const props = withDefaults(defineProps<TagItem>(), { select: false })
const tagClass = computed(() => {
  let result = ''
  switch (props.type) {
    case TagType.GRAY:
      result = `text-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.03)]`
      break
    case TagType.GREEN:
      result = `text-[#00CE84] bg-[rgba(0,206,132,0.05)]`
      break
    case TagType.RED:
      result = `text-[#FF4960] bg-[rgba(255,73,96,0.05)]`
      break
    case TagType.BLUE:
      result = `text-[#1998FF] bg-[rgba(25,152,255,0.05)]`
      break
    case TagType.GOLD:
      result = `text-[#DB9030] bg-[rgba(219,144,48,0.05)]`
      break
    default:
      // gray
      result = `text-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.03)]`
      break
  }
  if (props.select) {
    result += ' border-1 border-solid'
  }
  return result
})
</script>

<template>
  <div :class="tagClass" class="inline-block p-x-4 p-y-2 text-center text-12">
    {{ tag }}
  </div>
</template>
