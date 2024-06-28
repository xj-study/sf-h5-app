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
  <!-- :class="{
      'absolute': hFull,
      'left-0': hFull,
      'h-full': hFull,
      'w-full': hFull,
      'overflow-y-auto': hFull,
    }" -->
  <div
    class="absolute left-0 h-full w-full overflow-y-auto pt-46"
    :style="`padding-left: ${paddingX}px; padding-right: ${paddingX}px`"
  >
    <slot />
  </div>
</template>
