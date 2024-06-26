<script setup lang="ts">
import { buttonProps } from 'vant'

const props = defineProps({
  ...buttonProps,
  inline: { type: Boolean, default: true },
  btnCls: { type: String, default: '' },
})
const btnProps = computed(() => {
  const { inline, btnCls, ...rest } = props
  return rest
})
</script>

<template>
  <div :class="{ 'inline-block': inline }">
    <van-button v-bind="btnProps" :class="btnCls">
      <slot />
    </van-button>
  </div>
</template>
