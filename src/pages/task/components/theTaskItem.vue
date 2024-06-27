<script setup lang="ts">
import useTaskTag from '../utils/useTaskTag'
import useLoading from '@/hooks/useLoading'
import { recordComplete, recordCompleteByTaskId } from '@/api/taskApi'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['complete'])

const { tagData, statusInitFlag } = useTaskTag(props)

const { loadingFlag: completeLoadingFlag, loading: onComplete } = useLoading(async () => {
  let status: number = 0
  if (props.item.id)
    status = await recordComplete(props.item.id)
  else
    status = await recordCompleteByTaskId(props.item.taskId)
  emits('complete', { ...props.item, status })
})

// const verifyLoadingFlag = ref(false)
// async function toComplete() {
//   // 审核
//   verifyLoadingFlag.value = true
//   await delay(1000)
//   emits('verify', props.item)
//   await delay(100)
//   verifyLoadingFlag.value = false
// }

const btnFlag = computed(() => statusInitFlag.value)
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
      <base-button v-if="btnFlag" class="mt-20 min-w-100" size="small" plain type="primary" :loading="completeLoadingFlag" @click="onComplete">
        完成
      </base-button>
    </Transition>
  </div>
</template>
