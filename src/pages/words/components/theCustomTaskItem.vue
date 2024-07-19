<script setup lang="ts">
const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['edit'])

async function onEdit() {
  emits('edit', props.item)
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <span>{{ item.title }} </span>
      <div>
        <span class="text-20 text-amber-500">{{ item.integral }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <base-button size="small" plain type="primary" class="min-w-100" @click="onEdit">
        修改
      </base-button>
    </div>
  </div>
</template>
