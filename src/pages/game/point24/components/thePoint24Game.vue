<script setup lang="ts">
import { showToast } from 'vant'
import Point24Main from '../main'
import { Expression, type INumData, NumData, OpeType, RESULT } from '../typing'
import TheNumItem from './theNumItem.vue'
import TheOperationItem from './theOperationItem.vue'
import TheExpression from './theExpression.vue'

interface Config {
  task: boolean
  practice: boolean
  // 当前数量
  count: number
  btnNext: boolean
  btnTip: boolean
  progress: boolean
}
// task / practice 只能选1 若都选了，优先级以这个为准
interface Props {
  modelValue: boolean
  // 是否为任务
  task?: boolean
  // 是否为练习
  practice?: boolean
  // 当前数量
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  task: false,
  practice: false,
  count: 5,
})
const emits = defineEmits(['update:modelValue'])

const config = computed<Config>(() => {
  let { count, task, practice } = props
  practice = !task && practice

  let btnTip = true
  let btnNext = true
  let progress = true
  if (task) {
    btnTip = false
    btnNext = false
  } else if (practice) {
    progress = false
  } else {
    btnNext = false
  }
  return {
    task,
    practice,
    count,
    btnTip,
    btnNext,
    progress,
  }
})

const currentProgress = ref(1)
// 是否为最后一题
const isLastQuestion = computed(() => {
  return config.value.progress && currentProgress.value >= config.value.count
})

const NUM_SELECT_MAX = 2

const main = new Point24Main()
// 原始数字
const nums = ref<INumData[]>([])
// 计算得到的数字
const calcNums = ref<INumData[]>([])

const finallyResult = ref<NumData | null>(null)
const answerPassFlag = computed(() => finallyResult.value?.num === RESULT)
const resultData = computed(() => {
  if (answerPassFlag.value) {
    if (config.value.task) {
      if (isLastQuestion.value) {
        return { text: '你真棒！恭喜你完成任务', cls: 'text-green' }
      }
      return { text: '你真棒！再接再厉哟！', cls: 'text-green' }
    } else if (config.value.practice) {
      return { text: '你真棒！', cls: 'text-green' }
    }
    return { text: '你真棒！恭喜你通过关卡', cls: 'text-green' }
  } else {
    return { text: '没算对哟，清空再尝试一下！', cls: 'text-amber' }
  }
})

const expresss = ref([])
const tipExpression = ref('')
toStart()

function toStart() {
  main.create()
  nums.value = main.nums.map(num => new NumData(num))
}

const selectNums = ref<INumData[]>([])
function toSelectNum(data: INumData) {
  // 无法选中
  if (data.disabed)
    return

  // 取消选择
  if (data.select) {
    data.select = false
    selectNums.value = selectNums.value.filter(item => item !== data)
  } else {
    data.select = true
    if (selectNums.value.length === NUM_SELECT_MAX) {
      const firstItem = selectNums.value.shift()
      firstItem.select = false
    }
    selectNums.value.push(data)
  }
  checkNeedCalc()
}

const opes = [
  { value: OpeType.ADD, label: '加' },
  { value: OpeType.SUB, label: '减' },
  { value: OpeType.MUL, label: '乘' },
  { value: OpeType.DIV, label: '除' },
]
const selectOpe = ref<OpeType | ''>('')
function toSelectOpe(data) {
  if (selectOpe.value === data.value) {
    selectOpe.value = ''
  } else {
    selectOpe.value = data.value
  }
  checkNeedCalc()
}

// 检测一下是否需要计算
function checkNeedCalc() {
  if (selectNums.value.length === 2 && selectOpe.value) {
    const list = selectNums.value
    const result = (list[0] as NumData).calc(list[1], selectOpe.value)
    expresss.value.push(new Expression(list[0] as NumData, list[1] as NumData, selectOpe.value, result.id))

    if (calcNums.value.length === 2) {
      finallyResult.value = result

      // 若回答正确，则进入下一关
      if (answerPassFlag.value) {
        autoToNext()
      }
    } else {
      calcNums.value.push(result)
    }

    //
    for (let i = 0; i < list.length; i++) {
      list[i].select = false
      list[i].disabed = true
    }
    selectNums.value = []
    selectOpe.value = ''
  }
}

function resetData(clearTip = true) {
  selectNums.value = []
  selectOpe.value = ''
  calcNums.value = []
  finallyResult.value = null
  expresss.value = []

  clearTip && (tipExpression.value = '')
}

function toClear() {
  resetData(false)
  nums.value.forEach((item) => {
    item.select = false
    item.disabed = false
  })
}
function confirmOnAnswer() {
  // 确定无解
  if (main.answers.length) {
    showToast('回答的不对哟')
  } else {
    showToast('回答正确，进入下一题')

    setTimeout(() => {
      toNext()
    }, 1000)
  }
}
function toTip() {
  // 提示一下
  tipExpression.value = main.randomAnswers
}
// 回答正确会进入自动进入下一题，
function autoToNext() {
  if (config.value.progress) {
    if (currentProgress.value >= config.value.count) {
      // showToast('已经到最后了！')
      return
    }
    currentProgress.value++
  }
  if (config.value.practice)
    return
  setTimeout(() => {
    toNext()
  }, 3000)
}
function toNext() {
  resetData()
  main.create()
  nums.value = main.nums.map(num => new NumData(num))
}
function toExit() {
  resetData()
  currentProgress.value = 1
  emits('update:modelValue', false)
}
</script>

<template>
  <div v-show="modelValue" class="fixed top-0 z-100 h-screen w-screen bg-[rgba(0,0,0,0.8)] text-white">
    <div class="absolute bottom-8vh w-full">
      <div v-if="finallyResult">
        <div class="mb10 text-center font-bold" :class="resultData?.cls">
          {{ resultData?.text }}
        </div>
        <TheNumItem v-bind="finallyResult" class="m-auto" />
      </div>
      <div class="m-x-90 m-y-20 flex justify-between">
        <TheNumItem v-for="(item, index) in calcNums" :key="index" v-bind="item" @click="toSelectNum(item)" />
      </div>
      <div class="m-10 flex justify-between">
        <TheNumItem v-for="(item, index) in nums" :key="index" v-bind="item" @click="toSelectNum(item)" />
      </div>
      <div class="m-x-50 mt-20 flex justify-between">
        <TheOperationItem v-for="item in opes" :key="item.value" :select="item.value === selectOpe" :label="item.label" @click="toSelectOpe(item)" />
      </div>
      <div class="m20 flex items-center">
        <span>运算表达式：</span>
        <TheExpression :expresss="expresss" />
      </div>
      <div class="m-y-20 text-center">
        <base-button plain type="warning" class="bg-transparent text-white" @click="confirmOnAnswer">
          无解
        </base-button>
        <base-button plain type="warning" class="ml20 bg-transparent text-white" @click="toClear">
          清空
        </base-button>
        <base-button plain class="ml20 bg-transparent text-white" @click="toExit">
          退出
        </base-button>
      </div>
      <div v-if="config.btnTip || config.btnNext" class="mb20 mt30 text-center">
        <base-button v-if="config.btnTip" plain type="warning" class="relative bg-transparent text-white" @click="toTip">
          <span v-if="tipExpression" class="absolute left-[-20%] top-[-50%] text-nowrap text-color-amber font-bold">{{ tipExpression }}</span>
          提示
        </base-button>
        <base-button v-if="config.btnNext" :disabled="isLastQuestion" plain class="ml20 bg-transparent text-white" @click="toNext">
          换一个
        </base-button>
      </div>

      <div v-if="config.progress" class="absolute w-full text-center">
        <span>当前进度： </span><span class="text-24">{{ currentProgress }} / {{ config.count }}</span>
      </div>
    </div>
  </div>
</template>
