<script setup lang="ts">
interface Props {
  title?: string
  offsetTop?: string | number
  close?: boolean
}
withDefaults(defineProps<Props>(), { title: '', offsetTop: 0, close: true })
defineEmits(['close'])
const container = ref()
</script>

<template>
  <div ref="container" class="relative">
    <van-sticky :container="container" :offset-top="offsetTop">
      <div class="bg-white p-10 text-center text-20">
        <span class="inline-block min-h-20">{{ title }}</span>
        <van-icon v-show="close" name="cross" class="absolute right-0 top-0 p-10" @click="$emit('close')" />
      </div>
    </van-sticky>

    <slot />
  </div>
</template>
