<script setup lang="ts">
import { showToast } from 'vant'
import TheGiftItem from './components/theGiftItem.vue'
import TheBuyForm from './components/theBuyForm.vue'
import type { OrderGiftForm } from './typing'
import useUserStore from '@/stores/modules/user'
import { giftQuery } from '@/api/giftApi'
import useLoading from '@/hooks/useLoading'
import { orderBuy } from '@/api/orderApi'

definePage({
  name: 'gift',
  meta: {
    level: 2,
    title: '礼物中心',
  },
})
const { user, updateIntegral } = useUserStore()
const listRef = ref(null)
async function getList() {
  const records = await giftQuery()
  return records
}
onMounted(() => {
  updateIntegral()
})

const editShowFlag = ref(false)
const formData = ref(null)

function toBuy(item: OrderGiftForm) {
  formData.value = item
  editShowFlag.value = true
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: OrderGiftForm) => {
  await orderBuy(item)
  showToast('礼物兑换成功')
  editShowFlag.value = false
})
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <div>
        <span>积分余额：</span>
        <span class="text-amber-500">{{ user.integral }}</span>
      </div>
    </base-head-tool>
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheGiftItem v-for="data, index in list" :key="index" :item="data" @buy="toBuy" />
      </template>
    </base-refresh-list>
    <base-popup v-model:show="editShowFlag">
      <TheBuyForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
    </base-popup>
  </base-container>
</template>
