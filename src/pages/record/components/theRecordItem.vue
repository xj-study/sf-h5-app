<script setup lang="ts">
const props = defineProps({
  item: { type: Object, default: () => ({}) },
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
        <van-icon name="points text-amber-500" class="ml-4" />
      </div>
      <div class="mt-8 text-12">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
