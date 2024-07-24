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
const videoSize = computed(() => isTypeVideo.value ? 'scale-200 m-y-30' : '')
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <h1 v-if="!isTypeVideo" class="mr-10">
        {{ value }}
      </h1>
      <base-sound :word="enValue" :class="videoSize" />
    </div>
  </div>
</template>
