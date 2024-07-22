<script setup lang="ts">
interface Props {
  word: string
  size?: string
}
const props = defineProps<Props>()

const src = computed(() => `https://dict.youdao.com/dictvoice?audio=${props.word}&type=1`)
const audioRef = ref()
const isPlay = ref(false)
const cls = computed(() => {
  const result = [isPlay.value ? 'text-blue-400 border-blue-400' : 'text-gray']
  return result
})
function onClick() {
  if (isPlay.value)
    return
  if (audioRef.value) {
    isPlay.value = true
    audioRef.value.play()
  }
}

function onEnded() {
  isPlay.value = false
}
</script>

<template>
  <div :class="cls" class="h-30 w-30 flex items-center border rounded-full border-solid p-4 text-18" @click="onClick">
    <audio ref="audioRef" @ended="onEnded">
      <source :src="src">
    </audio>
    <van-icon name="volume-o" />
  </div>
</template>
