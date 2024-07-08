<script setup lang="ts">
import useOrderTag from '../utils/useOrderTag'
import { OrderStatus } from '../typing'
import { orderUpdateStatus } from '@/api/orderApi'
import useLoading from '@/hooks/useLoading'
import { ListType } from '@/typing'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
  type: { type: Number, default: ListType.USER },
})

const emits = defineEmits(['update'])

const { tagData, unshippedFlag } = useOrderTag(props)

const managerTypeFlag = computed(() => props.type === ListType.MANAGER)

const { loadingFlag: shippedLoadingFlag, loading: toShipped } = useLoading(async () => {
  await orderUpdateStatus(props.item.id, OrderStatus.SHIPPED)
  emits('update', { ...props.item, status: OrderStatus.SHIPPED })
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag v-if="tagData.tag" v-bind="tagData" class="mr-10" />
        {{ item.name }}
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="m-y-8 flex justify-between text-14">
      <div>
        <span class="color-gray">数量：</span>
        <span>{{ item.num }}</span>
      </div>
      <div class="flex items-center">
        <span class="color-gray">花费：</span>
        <base-gift-price :price="item.totalPrice" close-ratio class="text-emerald-600" />
      </div>
    </div>

    <div v-if="managerTypeFlag && unshippedFlag" class="mt-20">
      <base-button size="small" :loading="shippedLoadingFlag" plain type="primary" class="min-w-100" @click="toShipped">
        确认发货
      </base-button>
    </div>
  </div>
</template>
