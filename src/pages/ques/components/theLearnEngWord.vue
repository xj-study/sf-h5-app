<script setup lang="ts">
import { QuesAnswerStatus, type QuesData, type QuesWordData } from '../typing'
import TheQuesProgress from './theQuesProgress.vue'
import TheQuesWord from './theQuesWord.vue'
import { quesQuery } from '@/api/quesApi'

import useAppStore from '@/stores/modules/app'

interface Props {
  taskId: number
  type: number
}
const props = defineProps<Props>()
const show = defineModel({ default: false })

const { switchScroll } = useAppStore()
watchEffect(() => {
  switchScroll(!show.value)

  // 显示弹窗
  if (show.value) {
    queryQuesData()
  }
})

const quesData = ref<QuesData>()
const list = computed<QuesWordData[]>(() => {
  if (quesData.value) {
    return quesData.value.list
  }
  return []
})
const current = ref(0)

const currentQuesWordData = computed(() => {
  return list.value[current.value]
})

const userAnswers = computed(() => {
  return list.value.map(_ => ({
    status: QuesAnswerStatus.EMPTY,
  }))
})

async function queryQuesData() {
  const result = await quesQuery(props.taskId, props.type)
  quesData.value = result
}
function toNext() {
  current.value++
}
function toExit() {
  show.value = false
}
</script>

<template>
  <div v-show="show" class="fixed top-0 z-100 h-screen w-screen bg-[rgba(0,0,0,0.8)] p-10 text-white">
    <!-- 进度 -->
    <TheQuesProgress :model-value="current" :answers="userAnswers" />
    <!-- 题目 -->
    <TheQuesWord v-if="currentQuesWordData" :item="currentQuesWordData" />
    <!-- 操作 -->
    <div class="absolute bottom-8vh left-0 w-[100%] flex justify-between p-10">
      <base-button bg-translate class="flex-1 text-white" @click="toNext">
        下一题
      </base-button>
      <base-button bg-translate class="ml-10 text-white" @click="toExit">
        退出
      </base-button>
    </div>
  </div>
</template>
