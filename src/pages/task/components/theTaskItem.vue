<script setup lang="ts">
import useTaskTag from '../utils/useTaskTag'
import { TaskListType } from '../types'
import useLoading from '@/hooks/useLoading'
import { recordComplete, recordCompleteByTaskId } from '@/api/taskApi'

const props = defineProps({
  type: { type: Number, default: TaskListType.USER },
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['update'])

const { tagData, statusInitFlag, statusWaitVerifyFlag } = useTaskTag(props)

const { loadingFlag: completeLoadingFlag, loading: onComplete } = useLoading(async () => {
  let status: number = 0
  if (props.item.id)
    status = await recordComplete(props.item.id)
  else
    status = await recordCompleteByTaskId(props.item.taskId)
  emits('update', { ...props.item, status })
})

const { loadingFlag: verifyLoadingFlag, loading: onVerify } = useLoading(async () => {
  const status = await recordComplete(props.item.id)
  emits('update', { ...props.item, status })
})

const managerTypeFlag = computed(() => props.type === TaskListType.MANAGER)

const btnCompleteFlag = computed(() => !managerTypeFlag.value && statusInitFlag.value)
const btnVerifyFlag = computed(() => managerTypeFlag.value && statusWaitVerifyFlag.value)
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
      <base-button v-if="btnCompleteFlag" class="mt-20 min-w-100" size="small" plain type="primary" :loading="completeLoadingFlag" @click="onComplete">
        完成
      </base-button>
      <div v-else-if="btnVerifyFlag">
        <base-button class="mt-20 min-w-100" size="small" plain type="primary" :loading="verifyLoadingFlag" @click="onVerify">
          审核通过
        </base-button>
      </div>
    </Transition>
  </div>
</template>
