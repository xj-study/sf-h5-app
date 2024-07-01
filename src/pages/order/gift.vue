<script setup lang="ts">
import { OrderStatus } from './typing'
import TheGiftItem from './components/theGiftItem.vue'
import { orderQuery } from '@/api/orderApi'
import type { TabItem } from '@/components/typing'
import { ListType } from '@/typing'

definePage({
  name: 'orderGift',
  meta: {
    level: 2,
    title: '礼物兑换中心',
  },
})

const tabs = computed<TabItem[]>(() => {
  const result = [
    { title: '全部', value: -1 },
    { title: '未发货', value: OrderStatus.UNSHIPPED },
    { title: '已发货', value: OrderStatus.SHIPPED },
  ]
  return result
})

const route = useRoute()
const currentTabs = ref(-1)
const listRef = ref(null)
function onChange() {
  listRef.value.onRefresh()
}

async function getList() {
  const params: { status?: number, userId?: string } = { }
  if (currentTabs.value > -1)
    params.status = currentTabs.value

  const id: string = route.query.id as string
  if (id)
    params.userId = id

  const records = await orderQuery(params)
  return records
}

const listType = computed(() => {
  return route.query.id ? ListType.MANAGER : ListType.USER
})

function onItemUpdate() {}
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <base-tabs v-model="currentTabs" :list="tabs" @change="onChange" />
    </base-head-tool>
    <base-refresh-list ref="listRef" class="min-h-80vh" :get-list="getList">
      <template #default="{ list }">
        <TheGiftItem v-for="data in list" :key="data.id" :type="listType" :item="data" @update="onItemUpdate" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
