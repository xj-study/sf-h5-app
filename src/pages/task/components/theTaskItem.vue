<script setup lang="ts">
import useTaskTag from '../utils/useTaskTag'

import { type TaskForm, TaskType } from '../types'
import useLoading from '@/hooks/useLoading'
import { recordComplete, recordCompleteByTaskId } from '@/api/taskApi'
import { ListType } from '@/typing'

interface Props {
  type: ListType
  item: TaskForm
  date: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update', 'gamePoint24'])

const toOrOnCompleteText = computed(() => {
  const taskType = props.item.taskType
  if (TaskType.COMMON === taskType) {
    return '打卡'
  } else {
    return '打卡'
  }
})

const { tagData, statusInitFlag, statusWaitVerifyFlag } = useTaskTag(props)

async function updateRecoredComplete() {
  let status: number = 0
  if (props.item.id)
    status = await recordComplete(props.item.id)
  else
    status = await recordCompleteByTaskId(props.item.taskId, props.date)
  emits('update', { ...props.item, status })
}

const { loadingFlag: completeLoadingFlag, loading: onComplete } = useLoading(async () => {
  const taskType = props.item.taskType
  if (TaskType.GAME_POINT24 === taskType) {
    // 24 点游戏
    emits('gamePoint24', props.item, updateRecoredComplete)
    return
  }

  updateRecoredComplete()
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
        {{ toOrOnCompleteText }}
      </base-button>
      <div v-else-if="btnVerifyFlag">
        <base-button class="mt-20 min-w-100" size="small" plain type="primary" :loading="verifyLoadingFlag" @click="onVerify">
          审核通过
        </base-button>
      </div>
    </Transition>
  </div>
</template>
