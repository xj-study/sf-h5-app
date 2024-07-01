<script setup lang="ts">
import useTaskTag from '../utils/useTaskTag'

import useLoading from '@/hooks/useLoading'
import { recordComplete, recordCompleteByTaskId } from '@/api/taskApi'
import { ListType } from '@/typing'

const props = defineProps({
  type: { type: Number, default: ListType.USER },
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

const managerTypeFlag = computed(() => props.type === ListType.MANAGER)

const btnCompleteFlag = computed(() => !managerTypeFlag.value && statusInitFlag.value)
const btnVerifyFlag = computed(() => managerTypeFlag.value && statusWaitVerifyFlag.value)
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag v-if="tagData.tag" v-bind="tagData" class="mr-10" />
        <span> {{ item.title }} </span>
      </div>
      <div>
        <span class="text-20 text-amber-500">{{ item.integral || 0 }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
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
