<script setup lang="ts">
import TheGiftPrice from './theGiftPrice.vue'

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
      <div> {{ item.name }} </div>
      <TheGiftPrice :price="item.price" class="text-emerald-600" />
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <div class="mt-20 flex">
      <base-button size="small" plain type="primary" class="min-w-100" @click="onEdit">
        修改
      </base-button>
      <base-button size="small" plain type="warning" class="ml-10 min-w-100" @click="onOffShelf">
        下架
      </base-button>
    </div>
  </div>
</template>
