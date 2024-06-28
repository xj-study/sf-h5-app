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
    return `完成任务【${title}(${taskDate.join('-')})】`
  } else if (refType === RecordType.ORDER_GIFT) {
    const { name } = content
    return `兑换礼物【${name}】`
  }
  return ''
})
const prefix = computed(() => {
  return '获取'
})
const integral = computed(() => {
  return props.item.integralChange || 0
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="text-16">
      <div>
        <span class="pr-8 text-14">{{ prefix }}</span>
        <span class="text-20 text-amber-500">{{ integral }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
      <div class="mt-8 text-12">
        {{ message }}
      </div>
    </div>
  </div>
</template>
