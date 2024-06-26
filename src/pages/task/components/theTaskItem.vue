<script setup lang="ts">
import type { TagType } from 'vant'
import { isCompleteStatus, isInitStatus, isWaitVerifyStatus } from '../utils/taskStatusUtils'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['verify'])
const statusCompleteFlag = computed(() => isCompleteStatus(props.item.status))
const statusInitFlag = computed(() => isInitStatus(props.item.status))
const statusWaitVerifyFlag = computed(() => isWaitVerifyStatus(props.item.status))
const tagData = computed<{ text: string, type: TagType }>(() => {
  if (statusInitFlag.value) {
    return { text: '未完成', type: 'warning' }
  }
  if (statusWaitVerifyFlag.value) {
    return { text: '待审核', type: 'primary' }
  }
  if (statusCompleteFlag.value) {
    return { text: '已完成', type: 'success' }
  }
  return { text: '', type: 'default' }
})
const btnFlag = computed(() => statusWaitVerifyFlag.value)

const verifyLoadingFlag = ref(false)
async function onVerify() {
  // 审核
  verifyLoadingFlag.value = true
  await delay(1000)
  emits('verify', props.item)
  await delay(100)
  verifyLoadingFlag.value = false
}
function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration)
  })
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex text-16">
      <van-tag v-if="tagData.text" plain :type="tagData.type" class="mr-10">
        {{ tagData.text }}
      </van-tag>
      <span> {{ item.title }} </span>
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <Transition name="fade-item">
      <base-button v-if="btnFlag" class="mt-20" btn-cls="min-w-100" size="small" plain type="primary" :loading="verifyLoadingFlag" @click="onVerify">
        通过
      </base-button>
    </Transition>
  </div>
</template>
