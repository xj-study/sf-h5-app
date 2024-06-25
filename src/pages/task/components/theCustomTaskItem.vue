<script setup lang="ts">
const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['edit'])

const verifyLoadingFlag = ref(false)
async function onEdit() {
  // 审核
  verifyLoadingFlag.value = true

  emits('edit', props.item)
  await delay(400)
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

    <div class="mt-20">
      <van-button size="small" plain type="primary" class="min-w-100" :loading="verifyLoadingFlag" @click="onEdit">
        修改
      </van-button>
    </div>
  </div>
</template>
