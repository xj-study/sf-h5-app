<script setup lang="ts">
import useTaskTag from '../utils/useTaskTag'

import type { TaskForm } from '../types'
import useLoading from '@/hooks/useLoading'
import { recordComplete, recordCompleteByTaskId } from '@/api/taskApi'
import { ListType } from '@/typing'
import { RulesType } from '@/pages/components/rules/typing'

interface Props {
  type: ListType
  item: TaskForm
  date: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update', 'gamePoint24', 'learnEngWord'])

const toOrOnCompleteText = computed(() => {
  const taskType = props.item.taskType
  if (RulesType.COMMON === taskType) {
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
  if (RulesType.GAME_POINT24 === taskType) {
    // 24 点游戏
    emits('gamePoint24', props.item, updateRecoredComplete)
    return
  }
  if (RulesType.LEARN_ENG_WORD === taskType) {
    // 单词打卡
    emits('learnEngWord', props.item, updateRecoredComplete)
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
      <div class="text-amber-500">
        <span class="text-20">{{ item.integral || 0 }}</span>
        <van-icon name="points" class="ml-4" />
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
