<script setup lang="ts">
import useOrderTag from '../utils/useOrderTag'
import { ListType } from '@/typing'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
  type: { type: Number, default: ListType.USER },
})

defineEmits(['shipped'])

const { tagData } = useOrderTag(props)

const managerTypeFlag = computed(() => props.type === ListType.MANAGER)
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag v-if="tagData.tag" v-bind="tagData" class="mr-10" />
        {{ item.name }}
      </div>
      <base-gift-price :price="item.price" close-ratio class="text-emerald-600" />
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div v-if="managerTypeFlag" class="mt-20">
      <base-button size="small" plain type="primary" class="min-w-100" @click="$emit('shipped', item)">
        确认发货
      </base-button>
    </div>
  </div>
</template>
