<script setup lang="ts">
import { showToast } from 'vant'
import { type StoryLevelItem, type StoryRecordItem, StoryRecordStatus } from '../../typing'

import theStoryLevelItem from '../components/theStoryLevelItem.vue'

import useMainPage from '@/hooks/useMainPage'
import { storyActive, storyRecordQuery } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'

definePage({
  name: 'storyLevel',
  meta: {
    title: '故事',
  },
})

const { mainPageRef } = useMainPage()
const route = useRoute()
const storyId = (route.params as { id: number }).id
const storyData = ref<StoryRecordItem>()
async function getList() {
  const data = await storyRecordQuery(storyId)
  storyData.value = data
  document.title = storyData.value.title
  return data.levels
}
const isActive = computed(() => storyData.value.status !== StoryRecordStatus.NOT_ACTIVE)

// 去激活
const { loadingFlag, loading: toActive } = useLoading(async () => {
  const status = await storyActive(storyData.value.id)
  storyData.value.status = status
  showToast('成功激活！')
})

const currentItem = ref<StoryLevelItem>()
function toStart(item: StoryLevelItem) {
  if (!isActive.value) {
    showToast('激活后才能开始挑战！')
  }
  currentItem.value = item
}
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <div v-if="storyData">
        <div class="font-bold">
          {{ storyData.title }}
        </div>
        <div class="mt8 text-14">
          {{ storyData.content }}
        </div>
        <div v-if="!isActive" class="mt10 flex items-center justify-between">
          <div class="text-16">
            <span>门票：</span>
            <span class="text-20 text-amber-500">{{ storyData.costAmount || 0 }}</span>
            <span class="pl-8 text-12">积分</span>
          </div>

          <base-button :loading="loadingFlag" type="primary" size="small" class="min-w-120" @click="toActive">
            激活
          </base-button>
        </div>
      </div>
    </template>
    <template #default="{ itemData }">
      <theStoryLevelItem :key="itemData.id" :item="itemData" @start="toStart" />
    </template>
    <!-- <template #popup>
      <base-popup v-model:show="editShowFlag" :title="popupTitle">
        <TheStoryLevelForm :confirm-loading="loadingFlag" :item-data="selectStoryItem" @confirm="onConfirm" />
      </base-popup>
    </template> -->
  </base-main-page>
</template>
