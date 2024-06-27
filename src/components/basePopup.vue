<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  show: { type: Boolean, default: false },
})
defineEmits(['update:show'])
</script>

<template>
  <van-popup :show="show" position="bottom" @update:show="$emit('update:show', false)">
    <base-title :title="title" @close="$emit('update:show', false)">
      <slot />
    </base-title>
  </van-popup>
</template>
