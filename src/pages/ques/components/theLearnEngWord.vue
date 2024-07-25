<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import { QuesAnswerStatus, type QuesData, type QuesWordData } from '../typing'
import TheQuesProgress from './theQuesProgress.vue'
import TheQuesWord from './theQuesWord.vue'
import { quesQuery, quesSubmit } from '@/api/quesApi'

import useAppStore from '@/stores/modules/app'
import useLoading from '@/hooks/useLoading'

interface Props {
  id: number
  type: number
}
const props = defineProps<Props>()
const emits = defineEmits(['complete'])
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
const list = ref<QuesWordData[]>([])
const current = ref(0)

const isLast = computed(() => current.value + 1 === list.value.length)
const currentQuesWordData = computed(() => {
  return list.value[current.value]
})

const userAnswers = computed(() => {
  return list.value.map(item => item.answer)
})

function changeAnswer(answer) {
  const item = currentQuesWordData.value
  if (item) {
    item.answer = { ...item.answer, ...answer }
  }
}

function getSubmitAnswer(item: QuesWordData) {
  const answer = item.answer
  if (answer.status === QuesAnswerStatus.EMPTY)
    return ''
  if (answer.boxs)
    return answer.boxs.map(v => v.value).join('')
  return item.optionList[answer.index].enValue
}

// 确定提交
async function confirmSubmitQues() {
  const answers = list.value.map((item) => {
    const quesWordId = item.id
    const userAnswer = getSubmitAnswer(item)
    const wrongFlag = !item.answer.right
    const options = item.optionList?.map(e => e.id).join(',')
    return { quesWordId, userAnswer, wrongFlag, options }
  })

  const result = await quesSubmit({ answers })
  if (result) {
    emits('complete')
    show.value = false
  }
}

const { loading: submit, loadingFlag } = useLoading(confirmSubmitQues)

function submitQues() {
  if (!isLast.value)
    return

  // 判断是否存在未做的题目，若存在，则提醒一下
  const index = userAnswers.value.findIndex(item => item.status === QuesAnswerStatus.EMPTY)
  if (index > -1) {
    showConfirmDialog({
      title: '温馨提示',
      message: `还有题未完成，是否需要前往？`,
      confirmButtonText: '确定前往',
      cancelButtonText: '坚持提交',
    }).then(() => {
      current.value = index
    }, () => {
      submit()
    })
  } else {
    // 不存在
    submit()
  }
}

function nextQues() {
  if (isLast.value)
    return
  current.value++
}

async function queryQuesData() {
  const result: QuesData = await quesQuery(props.id, props.type)
  quesData.value = result

  const rst = quesData.value.list
  rst.forEach(item => item.answer = { status: QuesAnswerStatus.EMPTY })
  list.value = rst
}

function onAnswerChange(answer) {
  changeAnswer(answer)
}

function clickBtn() {
  if (isLast.value) {
    submitQues()
  } else {
    nextQues()
  }
}
function toExit() {
  show.value = false
}
const btnText = computed(() => isLast.value ? '提交' : '下一个')
</script>

<template>
  <div v-show="show" class="fixed top-0 z-100 h-screen w-screen bg-[rgba(0,0,0,0.8)] p-10 text-white">
    <!-- 进度 -->
    <TheQuesProgress v-model="current" :answers="userAnswers" />
    <!-- 题目 -->
    <TheQuesWord v-if="currentQuesWordData" :item="currentQuesWordData" @change="onAnswerChange" />
    <!-- 操作 -->
    <div class="absolute bottom-8vh left-0 w-[100%] flex justify-between p-10">
      <base-button :loading="loadingFlag" bg-translate class="flex-1 text-white" @click="clickBtn">
        {{ btnText }}
      </base-button>
      <base-button bg-translate class="ml-10 text-white" @click="toExit">
        退出
      </base-button>
    </div>
  </div>
</template>
