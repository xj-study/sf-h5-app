<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  show: { type: Boolean, default: false },
})
defineEmits(['update:show'])
</script>

<template>
  <van-popup :show="show" class="max-h-80vh" position="bottom" @update:show="$emit('update:show', false)">
    <base-title :title="title" offset-top="20vh" @close="$emit('update:show', false)">
      <slot />
    </base-title>
  </van-popup>
</template>
