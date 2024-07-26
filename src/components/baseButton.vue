<script setup lang="ts">
interface Props {
  inline?: boolean
  bgTranslate?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  inline: true,
  bgTranslate: false,
})
const attrsData = useAttrs()
const btnCls = computed(() => {
  if (props.bgTranslate)
    return 'bg-transparent'
  return ''
})
</script>

<template>
  <van-button v-bind="attrsData" :class="btnCls">
    <slot />
  </van-button>
</template>
