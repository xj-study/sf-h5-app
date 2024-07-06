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

async function getList() {
  const records = await giftQuery()
  return records
}

onMounted(() => {
  updateIntegral()
})

const router = useRouter()
function toOrderGiftList() {
  router.push('/order/gift')
}

const editShowFlag = ref(false)
const formData = ref(null)

function toBuy(item: OrderGiftForm) {
  formData.value = item
  editShowFlag.value = true
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: OrderGiftForm) => {
  await orderBuy(item)
  showToast('礼物兑换成功')
  formData.value = null
  editShowFlag.value = false
})
</script>

<template>
  <base-main-page :get-list="getList">
    <template #head-tool>
      <div class="flex justify-between">
        <div>
          <span>积分余额：</span>
          <span class="text-amber-500">{{ user.integral }}</span>
        </div>
        <base-text-link @click="toOrderGiftList">
          查看兑换记录
        </base-text-link>
      </div>
    </template>
    <template #default="{ itemData }">
      <TheGiftItem :key="itemData.giftId" :item="itemData" @buy="toBuy" />
    </template>
    <template #popup>
      <base-popup v-model:show="editShowFlag">
        <TheBuyForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
