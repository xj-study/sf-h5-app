<script setup lang="ts">
import { showToast } from 'vant'
import TheStoryForm from './components/theStoryForm.vue'
import type { StoryItem } from './typing'

import TheCustomStoryItem from './components/theCustomStoryItem.vue'
import useLoading from '@/hooks/useLoading'
import { storyAdd, storyDisableQueryList, storyQueryList, storyUpdate } from '@/api/storyApi'
import useMainPage from '@/hooks/useMainPage'

definePage({
  name: 'storyCustom',
  meta: {
    title: '故事中心',
  },
})

const { mainPageRef, listUpdate, onRefresh } = useMainPage()

const tabs = [
  { title: '有效', value: 0 },
  { title: '下架', value: 1 },
]

const currentTabs = ref(0)

function onChange() {
  onRefresh()
}

async function getList() {
  let records = []
  if (currentTabs.value === 1) {
    records = await storyDisableQueryList()
  } else {
    records = await storyQueryList({})
  }
  return records
}

const editShowFlag = ref(false)
const selectStoryItem = ref<StoryItem>(null)
const popupTitle = ref('')

function toAdd() {
  selectStoryItem.value = null
  popupTitle.value = '新增故事'
  editShowFlag.value = true
}

function toEdit(item: StoryItem) {
  selectStoryItem.value = item
  popupTitle.value = '编辑故事'
  editShowFlag.value = true
}

function toRemove(item: StoryItem) {
  listUpdate(item, 'id', { remove: true })
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: StoryItem) => {
  if (!item.id) {
    const storyId = await storyAdd(item)
    item.id = storyId
    listUpdate(item)
    showToast('添加成功')
  } else {
    await storyUpdate(item)
    showToast('更新成功')
    listUpdate(item, 'id')
  }

  editShowFlag.value = false
})
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <base-button icon="add" @click="toAdd">
        添加故事
      </base-button>
      <base-tabs v-model="currentTabs" :list="tabs" @change="onChange" />
    </template>
    <template #default="{ itemData }">
      <TheCustomStoryItem :key="itemData.id" :item="itemData" @remove="toRemove" @edit="toEdit" />
    </template>
    <template #popup>
      <base-popup v-model:show="editShowFlag" :title="popupTitle">
        <TheStoryForm :confirm-loading="loadingFlag" :item-data="selectStoryItem" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
