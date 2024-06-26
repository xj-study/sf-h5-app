<script setup lang="ts">
const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['verify'])

const verifyLoadingFlag = ref(false)
async function onVerify() {
  // 审核
  verifyLoadingFlag.value = true
  await delay(1000)
  emits('verify', props.item)
  await delay(100)
  verifyLoadingFlag.value = false
}
function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration)
  })
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div> {{ item.title }} </div>
      <div class="text-emerald-600">
        {{ item.price * 100 }} 积分
      </div>
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <Transition name="fade-item">
      <base-button size="small" plain type="primary" class="mt-20" btn-cls="min-w-100" :loading="verifyLoadingFlag" @click="onVerify">
        兑换
      </base-button>
    </Transition>
  </div>
</template>
