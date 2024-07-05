<script setup lang="ts">
import TheRecordItem from './components/theRecordItem.vue'
import { queryIntegralRecords } from '@/api/userApi'

definePage({
  name: 'recordIntegral',
  meta: {
    level: 2,
    title: '积分明细',
  },
})
const listRef = ref()
async function getList() {
  const records = await queryIntegralRecords()

  return records
}
</script>

<template>
  <base-container :padding-x="0">
    <base-refresh-list ref="listRef" class="min-h-80vh" :get-list="getList">
      <template #default="{ itemData }">
        <TheRecordItem :key="itemData.id" :item="itemData" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
