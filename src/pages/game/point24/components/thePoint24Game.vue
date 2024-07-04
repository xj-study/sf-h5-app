<script setup lang="ts">
import { showToast } from 'vant'
import Point24Main from '../main'
import { Expression, type INumData, NumData, OpeType, RESULT } from '../typing'
import TheNumItem from './theNumItem.vue'
import TheOperationItem from './theOperationItem.vue'
import TheExpression from './theExpression.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emits = defineEmits(['update:modelValue'])

const NUM_SELECT_MAX = 2

const main = new Point24Main()
// 原始数字
const nums = ref<INumData[]>([])
// 计算得到的数字
const calcNums = ref<INumData[]>([])

const finallyResult = ref<NumData | null>(null)
const resultData = computed(() => {
  if (finallyResult.value) {
    if (finallyResult.value.num === RESULT) {
      return { text: '你真棒！获得 1 积分', cls: 'text-green' }
    } else {
      return { text: '没算对哟，清空再尝试一下！', cls: 'text-amber' }
    }
  }
  return null
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
    toNext()
  }
}
function toTip() {
  // 提示一下
  tipExpression.value = main.randomAnswers
}
function toNext() {
  resetData()
  main.create()
  nums.value = main.nums.map(num => new NumData(num))
}
function toExit() {
  resetData()
  emits('update:modelValue', false)
}
</script>

<template>
  <div v-show="modelValue" class="fixed top-0 h-screen w-screen bg-[rgba(0,0,0,0.8)] text-white">
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
      <div class="mt-20 text-center">
        <base-button plain type="warning" class="bg-transparent text-white" @click="confirmOnAnswer">
          无解
        </base-button>
        <base-button plain type="warning" class="ml20 bg-transparent text-white" @click="toClear">
          清空
        </base-button>
        <base-button plain type="warning" class="relative ml20 bg-transparent text-white" @click="toTip">
          <span v-if="tipExpression" class="absolute left-[-20%] top-[-50%] text-nowrap text-color-amber font-bold">{{ tipExpression }}</span>
          提示
        </base-button>
      </div>
      <div class="mt-20 text-center">
        <base-button plain class="bg-transparent text-white" @click="toNext">
          下一个
        </base-button>
        <base-button plain type="warning" class="ml20 bg-transparent text-white" @click="toExit">
          退出
        </base-button>
      </div>
    </div>
  </div>
</template>
