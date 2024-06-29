<script setup lang="ts">
defineProps({
  postfix: { type: String, default: '>' },
})
</script>

<template>
  <div class="text-14 color-blue">
    <slot /> {{ postfix }}
  </div>
</template>
