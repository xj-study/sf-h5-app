<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="mt-20 p-x-10">
    <div class="mb-10 text-16 before:mr-4 before:inline-block before:h-12 before:w-4 before:bg-blue before:content-['']">
      {{ title }}
    </div>

    <slot />
  </div>
</template>
