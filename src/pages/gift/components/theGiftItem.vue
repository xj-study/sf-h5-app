<script setup lang="ts">
import { showToast } from 'vant'
import TheGiftPrice from './theGiftPrice.vue'
import useLoading from '@/hooks/useLoading'
import useUserStore from '@/stores/modules/user'

import { orderBuy } from '@/api/orderApi'
import { OrderType } from '@/typing'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
const { user } = useUserStore()
const { loadingFlag, loading: toExchange } = useLoading(async () => {
  if (user.integral < props.item.price * user.exchangeRatio) {
    showToast('积分不足！')
  } else {
    // 开始兑换
    await orderBuy(props.item.giftId, OrderType.GIFT)
    showToast('兑换成功！')
  }
})
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
    <Transition name="fade-item">
      <base-button size="small" plain type="primary" class="mt-20 min-w-100" :loading="loadingFlag" @click="toExchange">
        兑换
      </base-button>
    </Transition>
  </div>
</template>
