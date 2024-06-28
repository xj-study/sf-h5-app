<script setup lang="ts">
import TheGiftItem from './components/theGiftItem.vue'
import useUserStore from '@/stores/modules/user'
import { giftQuery } from '@/api/giftApi'

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

function onItemVerify() {

}
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
        <TheGiftItem v-for="data, index in list" :key="index" :item="data" @verify="onItemVerify" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
