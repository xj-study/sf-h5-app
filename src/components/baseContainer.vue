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
    class="min-h-screen pt-46"
    :class="{
      'absolute': hFull,
      'left-0': hFull,
      'h-full': hFull,
      'overflow-y-auto': hFull,
    }"
    :style="`padding-left: ${paddingX}px; padding-right: ${paddingX}px`"
  >
    <slot />
  </div>
</template>
