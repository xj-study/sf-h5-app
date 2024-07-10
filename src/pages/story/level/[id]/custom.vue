<script setup lang="ts">
import { showToast } from 'vant'
import type { StoryLevelItem } from '../../typing'

import TheCustomStoryLevelItem from '../components/theCustomStoryLevelItem.vue'
import TheStoryLevelForm from '../components/theStoryLevelForm.vue'
import useMainPage from '@/hooks/useMainPage'
import { storyLevelAdd, storyLevelQueryList } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'

definePage({
  name: 'storyLevelCustom',
  meta: {
    title: '故事关卡配置',
  },
})

const { mainPageRef, listUpdate } = useMainPage()
const route = useRoute()
const storyId = (route.params as { id: number }).id
async function getList() {
  const records = await storyLevelQueryList(storyId)
  return records
}

const editShowFlag = ref(false)
const selectStoryItem = ref<StoryLevelItem>(null)
const popupTitle = ref('')

function toAdd() {
  selectStoryItem.value = null
  popupTitle.value = '新增关卡'
  editShowFlag.value = true
}

function toEdit(item: StoryLevelItem) {
  selectStoryItem.value = item
  popupTitle.value = '编辑关卡'
  editShowFlag.value = true
}

function toRemove(item: StoryLevelItem) {
  listUpdate(item, 'id', { remove: true })
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: StoryLevelItem) => {
  if (item.id) {
    //

  } else {
    // add
    item.storyId = storyId
    await storyLevelAdd(item)
    showToast('添加成功')
    listUpdate(item, 'id')
  }
  // if (!item.id) {
  //   const storyId = await storyAdd(item)
  //   item.id = storyId
  //   listUpdate(item)
  //   showToast('添加成功')
  // } else {
  //   await storyUpdate(item)
  //   showToast('更新成功')
  //   listUpdate(item, 'id')
  // }

  editShowFlag.value = false
})
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <base-button icon="add" @click="toAdd">
        添加关卡
      </base-button>
    </template>
    <template #default="{ itemData }">
      <TheCustomStoryLevelItem :key="itemData.id" :item="itemData" @remove="toRemove" @edit="toEdit" />
    </template>
    <template #popup>
      <base-popup v-model:show="editShowFlag" :title="popupTitle">
        <TheStoryLevelForm :confirm-loading="loadingFlag" :item-data="selectStoryItem" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
