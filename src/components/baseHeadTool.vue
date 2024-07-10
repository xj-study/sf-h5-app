<script setup lang="ts">
defineProps({
  padding: { type: Boolean, default: true },
})
</script>

<template>
  <van-sticky>
    <div class="bg-white p-x-10" :class="{ 'p-y-10': padding }">
      <slot />
    </div>
  </van-sticky>
</template>
