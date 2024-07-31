<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  show: { type: Boolean, default: false },
})
const emits = defineEmits(['update:show'])

const isRight = ref(false)
function open() {
  isRight.value = true
}
function close() {
  isRight.value = false
}

function onClickOverlay() {
  if (!isRight.value) {
    emits('update:show', false)
  } else {
    close()
  }
}

const containerCls = computed(() => {
  const result = ['flex-1']
  if (isRight.value) {
    result.push('translate-x-[-100vw]')
  } else {
    result.push('translate-x-0')
  }
  return result
})

// watch(() => props.show, () => {
//   if (!props.show)
//     isRight.value = false
// })

defineExpose({
  open,
  close,
})
</script>

<template>
  <van-popup :show="show" :close-on-click-overlay="false" class="max-h-80vh overflow-x-hidden" position="bottom" @click-overlay="onClickOverlay" @update:show="$emit('update:show', false)">
    <base-title :title="title" offset-top="20vh" :close="!isRight" @close="$emit('update:show', false)">
      <div class="w-200vw flex transition" :class="containerCls">
        <div class="flex-1">
          <slot />
        </div>
        <div class="flex-1">
          <slot name="right" />
        </div>
      </div>
    </base-title>
  </van-popup>
</template>
