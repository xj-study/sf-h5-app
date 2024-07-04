<script setup lang="ts">
import { type IExpression, type NumData, OpeTypeValue } from '../typing'

interface Props {
  expresss: IExpression[]
}

const props = defineProps<Props>()

function replaceNumById(numData: NumData, refs, opeTypeValue = 0) {
  const result = []
  if (numData.id in refs) {
    const express = refs[numData.id]
    if (OpeTypeValue[express.opeType] >= opeTypeValue) {
      result.push(replaceExpress(express, refs))
    } else {
      result.push('( ')
      result.push(replaceExpress(express, refs))
      result.push(' )')
    }
  } else {
    result.push(numData.num)
  }
  return result.flat(2)
}

function replaceExpress(express: IExpression, refs) {
  const result = []
  result.push(replaceNumById(express.num1, refs, OpeTypeValue[express.opeType]))
  result.push(express.opeType)
  result.push(replaceNumById(express.num2, refs, OpeTypeValue[express.opeType]))
  return result.flat(2)
}

const express = computed(() => {
  if (props.expresss.length < 3)
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
