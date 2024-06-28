<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
})
defineEmits(['close'])
</script>

<template>
  <div class="relative">
    <div class="p-10 text-center text-20">
      <span class="inline-block min-h-20">{{ title }}</span>
      <van-icon name="cross" class="absolute right-0 top-0 p-10" @click="$emit('close')" />
    </div>

    <slot />
  </div>
</template>
