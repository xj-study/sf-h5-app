<script setup lang="ts">
import type { IExpression, NumData } from '../typing'

interface Props {
  expresss: IExpression[]
}

const props = defineProps<Props>()

function replaceNumById(numData: NumData, refs) {
  const result = []
  if (numData.id in refs) {
    result.push('( ')
    result.push(replaceExpress(refs[numData.id], refs))
    result.push(' )')
  } else {
    result.push(numData.num)
  }
  return result.flat(2)
}

function replaceExpress(express: IExpression, refs) {
  const result = []
  result.push(replaceNumById(express.num1, refs))
  result.push(express.opeType)
  result.push(replaceNumById(express.num2, refs))
  return result.flat(2)
}

const express = computed(() => {
  if (props.expresss.length === 0)
    return ''
  const refs: { [key: string]: IExpression } = props.expresss.reduce((res, cur) => {
    res[cur.refId] = cur
    return res
  }, {})
  const result = replaceExpress(props.expresss[props.expresss.length - 1], refs)
  return result.join(' ')
})
</script>

<template>
  <div>{{ express }}</div>
</template>
