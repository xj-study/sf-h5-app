<script setup lang="ts">
import { buttonProps } from 'vant'

const props = defineProps({
  ...buttonProps,
  inline: { type: Boolean, default: true },
})
</script>

<template>
  <div :class="{ 'inline-block': inline }">
    <van-button v-bind="props">
      <slot />
    </van-button>
  </div>
</template>
