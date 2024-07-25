<script setup lang="ts">
import { QuesWordFillLevelType } from '../typing'
import { randomNum } from '@/utils/common'

interface Props {
  value: string
  level: number
}
interface Box {
  value: string
  input: boolean
  select: boolean
  answer?: string
}

const props = defineProps<Props>()

const emits = defineEmits(['input'])

const PERCENTS = {
  [QuesWordFillLevelType.SIMPLE]: 0.1,
  [QuesWordFillLevelType.DIFFCULTY]: 0.5,
}
const boxList = computed(() => {
  const result: Box[] = props.value.split('').map(val => ({ value: val, input: false, select: false }))
  if (props.level === QuesWordFillLevelType.DIFFCULTY) {
    result.forEach(item => item.input = true)
  } else {
    const len = result.length
    const inputSize = Math.ceil(len * PERCENTS[props.level])
    const randomIdx = randomNum(len, inputSize)
    randomIdx.forEach(idx => result[idx].input = true)
  }
  return reactive(result)
})

function delAnswer() {
  const item = boxList.value.find(item => item.select)
  if (item) {
    item.answer = ''
  } else {
    // 找到最后一个
    const lastItem = boxList.value.findLast(item => item.input)
    lastItem.answer = ''
    lastItem.select = true
  }
}

function inputAnswer(answer, isNext: boolean = true) {
  const item = boxList.value.find(item => item.select)
  if (item) {
    item.answer = answer
    // 选中下一个
    isNext && nextInput()
  }
}

// 下一个输入
function nextInput() {
  const index = boxList.value.findIndex(item => item.select)
  if (index !== -1) {
    boxList.value[index].select = false
    // 往后开始找
    let i = index + 1
    for (; i < boxList.value.length; i++) {
      if (boxList.value[i].input) {
        boxList.value[i].select = true
      }
    }
    //
    if (i === boxList.value.length) {
      // 没找到
      emits('input')
    }
  } else {
    // 找到第一个格子
    const item = boxList.value.find(item => item.input)
    item.select = true
  }
}

const boxInputCls = 'h-40 w-40  border-solid border border-[rgba(255,255,255,.3)] box-border'
const boxLabelCls = 'h-40 p-x-2 border-solid border-transparent'
function getBoxCls(val: Box) {
  const result = []
  if (val.input) {
    result.push(boxInputCls)
  } else {
    result.push(boxLabelCls)
  }
  if (val.select) {
    result.push('bg-[rgba(255,255,255,.2)]')
  }
  return result
}
function getBoxVal(item: Box) {
  if (item.input)
    return item.answer
  return item.value
}
function toSelect(item: Box) {
  if (item.input)
    item.select = true
}
function onInput(val) {
  inputAnswer(val)
}
function onDel() {
  delAnswer()
}
onMounted(() => {
  nextInput()
})
</script>

<template>
  <div class="flex justify-center text-center text-30">
    <div v-for="val, index in boxList" :key="index" :class="getBoxCls(val)" @click="toSelect(val)">
      {{ getBoxVal(val) }}
    </div>
  </div>
  <base-keyboard @input="onInput" @del="onDel" />
</template>
