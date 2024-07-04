<script setup lang="ts">
const props = defineProps({
  label: { type: String },
  select: { type: Boolean },
})

const cls = computed(() => {
  let result = 'h-50 w-50 border-2 border-solid text-center text-28 leading-50'
  if (props.select) {
    result += ' bg-sky-500/45'
  } else {
    result += ' bg-[rgba(0,0,0,0.8)]'
  }
  return result
})
</script>

<template>
  <div :class="cls">
    {{ label }}
  </div>
</template>
