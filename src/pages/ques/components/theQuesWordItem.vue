<script setup lang="ts">
import { isQuesWordTypeSelect, isQuesWordTypeVideo } from '../quesUtils'

interface Props {
  type: number
  zhValue: string
  enValue: string
}
const props = defineProps<Props>()
const isTypeVideo = computed(() => isQuesWordTypeVideo(props.type))
const isTypeSelect = computed(() => isQuesWordTypeSelect(props.type))
const value = computed(() => isTypeSelect.value ? props.enValue : props.zhValue)
const videoSize = computed(() => isTypeVideo.value ? 'scale-200' : '')
</script>

<template>
  <div class="m-y-80 flex items-center justify-center">
    <div v-if="!isTypeVideo" class="mr-10 text-40">
      {{ value }}
    </div>
    <base-sound :word="enValue" :class="videoSize" />
  </div>
</template>
