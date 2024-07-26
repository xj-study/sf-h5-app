<script setup lang="ts">
import { type QuesFillBox, QuesWordFillLevelType } from '../typing'
import { randomNum } from '@/utils/common'

interface Props {
  value: string
  level: number
  answer?: QuesFillBox[]
}

const props = defineProps<Props>()

const emits = defineEmits(['change'])

const PERCENTS = {
  [QuesWordFillLevelType.SIMPLE]: 0.1,
  [QuesWordFillLevelType.MIDDLE]: 0.5,
}
const boxList = computed(() => {
  if (props.answer) {
    // 用户数据回显
    if (isReactive(props.answer))
      return props.answer
    return reactive(props.answer)
  }

  const result: QuesFillBox[] = props.value.split('').map(val => ({ value: val, input: false, select: false }))
  if (props.level === QuesWordFillLevelType.DIFFCULTY) {
    result.forEach(setItemInput)
  } else {
    const len = result.length
    const inputSize = Math.ceil(len * PERCENTS[props.level])
    const randomIdx = randomNum(len, inputSize)
    randomIdx.forEach(idx => setItemInput(result[idx]))
  }
  return reactive(result)
})

function setItemInput(item: QuesFillBox) {
  item.input = true
  item.value = ''
}

function changeAnswer() {
  emits('change', boxList.value)
}

function delAnswer() {
  const item = boxList.value.find(item => item.select)
  if (item) {
    if (item.value === '') {
      // 已经删除了，就找上一个
      const index = boxList.value.findIndex(v => v === item)
      let i = index - 1
      for (;i >= 0; i--) {
        const tmp = boxList.value[i]
        if (tmp.input) {
          tmp.select = true
          tmp.value = ''
          break
        }
      }
      if (i >= 0) {
        item.select = false
      }
    } else {
      item.value = ''
    }
  } else {
    // 找到最后一个
    const lastItem = boxList.value.findLast(item => item.input)
    lastItem.value = ''
    lastItem.select = true
  }
  changeAnswer()
}

function inputAnswer(answer, isNext: boolean = true) {
  const item = boxList.value.find(item => item.select)
  if (item) {
    item.value = answer
    // 选中下一个
    isNext && nextInput()

    changeAnswer()
  }
}

function selectInput(item: QuesFillBox) {
  const current = boxList.value.find(item => item.select)
  if (current === item)
    return
  if (current)
    current.select = false
  item.select = true
}

function selectFirstInput() {
  const selectItem = boxList.value.find(item => item.select)
  if (!selectItem) {
    // 找到第一个格子
    const item = boxList.value.find(item => item.input)
    item.select = true

    if (!props.answer)
      changeAnswer()
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
        break
      }
    }
    //
    if (i === boxList.value.length) {
      // 没找到
    }
  }
}

const boxInputCls = 'h-40 w-40  border-solid border border-[rgba(255,255,255,.3)] box-border'
const boxLabelCls = 'h-40 p-x-2 border-solid border-transparent'
function getBoxCls(val: QuesFillBox) {
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

function toSelect(item: QuesFillBox) {
  selectInput(item)
}
function onInput(val) {
  inputAnswer(val)
}
function onDel() {
  delAnswer()
}

watch(() => props.value, () => {
  selectFirstInput()
})
onMounted(() => {
  selectFirstInput()
})
</script>

<template>
  <div class="flex justify-center text-center text-30">
    <div v-for="val, index in boxList" :key="index" :class="getBoxCls(val)" @click="toSelect(val)">
      {{ val.value }}
    </div>
  </div>
  <base-keyboard @input="onInput" @del="onDel" />
</template>
