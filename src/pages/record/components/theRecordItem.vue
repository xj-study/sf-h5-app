<script setup lang="ts">
import { RecordType } from '@/typing'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})

const message = computed(() => {
  const { refType } = props.item
  const content = JSON.parse(props.item.content)
  if (refType === RecordType.TASK) {
    const { title, taskDate } = content
    if (typeof taskDate === 'string') {
      return `完成任务【${title}(${taskDate})】`
    } else {
      return `完成任务【${title}(${taskDate.join('-')})】`
    }
  } else if (refType === RecordType.ORDER_GIFT) {
    const { name } = content
    return `兑换礼物【${name}】`
  }
  return ''
})
const integral = computed(() => {
  return props.item.integralChange || 0
})

const prefix = computed(() => {
  return integral.value < 0 ? '消耗' : '获得'
})
const integralText = computed(() => Math.abs(integral.value))
const integralCls = computed(() => {
  return integral.value < 0 ? 'text-red' : 'text-amber-500'
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="text-16">
      <div>
        <span class="pr-8 text-14">{{ prefix }}</span>
        <span class="text-20" :class="integralCls">{{ integralText }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
      <div class="mt-8 text-12">
        {{ message }}
      </div>
    </div>
  </div>
</template>
