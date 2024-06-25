<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="m-y-10 p-x-10">
    <div class="headtag mb-10 text-16">
      {{ title }}
    </div>

    <slot />
  </div>
</template>
