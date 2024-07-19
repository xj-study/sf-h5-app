<script setup lang="ts">
import theStoryItem from './components/theStoryItem.vue'
import { storyRecordQueryList } from '@/api/storyApi'
import useMainPage from '@/hooks/useMainPage'

definePage({
  name: 'story',
  meta: {
    title: '活动中心',
  },
})

const { mainPageRef } = useMainPage()
async function getList() {
  const records = await storyRecordQueryList({})

  return records
}
</script>

<template>
  <base-main-page ref="mainPageRef" :head-tool-padding="false" :get-list="getList">
    <template #default="{ itemData }">
      <theStoryItem :key="itemData.id" :item="itemData" />
    </template>
  </base-main-page>
</template>
