<script setup lang="ts">
defineProps({
  paddingX: {
    type: Number,
    default: 16,
  },
  hFull: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :style="`padding-left: ${paddingX}px; padding-right: ${paddingX}px`"
  >
    <slot />
  </div>
</template>
