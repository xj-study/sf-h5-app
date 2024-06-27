<script setup lang="ts">
defineProps({
  inline: { type: Boolean, default: true },
})
const attrsData = useAttrs()
</script>

<template>
  <van-button v-bind="attrsData">
    <slot />
  </van-button>
</template>
