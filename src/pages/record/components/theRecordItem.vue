<script setup lang="ts">
defineProps({
  item: { type: Object, default: () => ({}) },
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div>
        <span class="text-20 text-amber-500">{{ item.integralChange || 0 }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>
  </div>
</template>
