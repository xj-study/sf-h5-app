<script setup lang="ts">
const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['edit', 'offShelf'])

function onEdit() {
  emits('edit', props.item)
}
function onOffShelf() {
  emits('offShelf', props.item)
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div> {{ item.title }} </div>
      <div class="text-emerald-600">
        {{ item.price * 100 }} 积分
      </div>
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <div class="mt-20 flex">
      <base-button size="small" plain type="primary" btn-cls="min-w-100" @click="onEdit">
        修改
      </base-button>
      <base-button size="small" plain type="warning" class="ml-10" btn-cls="min-w-100" @click="onOffShelf">
        下架
      </base-button>
    </div>
  </div>
</template>
