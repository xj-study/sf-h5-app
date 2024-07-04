<script setup lang="ts">
import { showToast } from 'vant'
import Point24Main from './main'
import TheNumItem from './components/theNumItem.vue'
import TheOperationItem from './components/theOperationItem.vue'
import { Expression, type INumData, NumData, OpeType, RESULT } from './typing'
import TheExpression from './components/theExpression.vue'

definePage({
  name: 'gamePoint24',
  meta: {
    common: true,
  },
})
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

const startFlag = ref(false)
function toStart() {
  main.create()
  nums.value = main.nums.map(num => new NumData(num))

  startFlag.value = true
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

function resetData() {
  selectNums.value = []
  selectOpe.value = ''
  calcNums.value = []
  finallyResult.value = null
  expresss.value = []
  tipExpression.value = ''
}

function toClear() {
  resetData()
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
  startFlag.value = false
}
</script>

<template>
  <base-container :padding-x="0">
    <!-- 规则 -->
    <base-cell-head title="游戏规则">
      <div>随机抽取 4 位 1 ~ 13 的数字，通过加减乘除四则运算，且每个数字及每两数字运算得到的数字只能使用一次，最后计算所得的一位数字为 24 时，则算游戏成功</div>
      <div class="m-y-10 font-bold">
        示例：1 1 3 8
      </div>
      <div class="text-w">
        可能运算结果：<span class="font-bold">1 × 1 × 3 × 8 = 24</span>
      </div>
    </base-cell-head>
    <div class="mt-20 p-x-10">
      <base-button type="primary" @click="toStart">
        开始游戏
      </base-button>
    </div>
    <div v-show="startFlag" class="fixed top-0 h-screen w-screen bg-[rgba(0,0,0,0.8)] text-white">
      <div class="absolute bottom-8vh w-full">
        <div v-if="finallyResult">
          <div class="mb10 text-center font-bold" :class="resultData?.cls">
            {{ resultData?.text }}
          </div>
          <TheNumItem v-bind="finallyResult" class="m-auto" />
        </div>
        <div class="m-x-90 m-y-40 flex justify-between">
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
          <span v-if="tipExpression" class="text-color-amber font-bold">{{ tipExpression }}</span>
          <TheExpression :expresss="expresss" />
        </div>
        <div class="mt-20 text-center">
          <base-button plain type="warning" class="bg-transparent text-white" @click="confirmOnAnswer">
            无解
          </base-button>
          <base-button plain type="warning" class="ml20 bg-transparent text-white" @click="toClear">
            清空
          </base-button>
          <base-button plain type="warning" class="ml20 bg-transparent text-white" @click="toTip">
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
  </base-container>
</template>
