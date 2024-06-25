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
    <div class="flex text-16">
      <span> {{ item.title }} </span>
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <Transition name="fade-item">
      <base-button size="small" plain type="primary" class="mt-20 min-w-100" :loading="verifyLoadingFlag" @click="onVerify">
        兑换
      </base-button>
    </Transition>
  </div>
</template>
