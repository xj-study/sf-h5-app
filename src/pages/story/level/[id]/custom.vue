<script setup lang="ts">
import { showToast } from 'vant'
import { StoryLevelItem } from '../../typing'

import TheCustomStoryLevelItem from '../components/theCustomStoryLevelItem.vue'
import TheStoryLevelForm from '../components/theStoryLevelForm.vue'
import useMainPage from '@/hooks/useMainPage'
import { storyLevelAdd, storyLevelQueryList, storyLevelUpdate } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'

definePage({
  name: 'storyLevelCustom',
  meta: {
    title: '故事关卡配置',
  },
})

const { mainPageRef, listUpdate, onRefresh } = useMainPage()
const route = useRoute()
const storyId = (route.params as { id: number }).id
async function getList() {
  const records = await storyLevelQueryList(storyId)
  return records
}

const editShowFlag = ref(false)
const selectStoryItem = ref<StoryLevelItem>(null)
const popupTitle = ref('')

const listSize = ref(0)
function toAdd() {
  const data = new StoryLevelItem()
  data.levelOrder = listSize.value + 1
  selectStoryItem.value = data
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
    await storyLevelUpdate(item)
    showToast('操作成功')
  } else {
    item.storyId = storyId
    await storyLevelAdd(item)
    showToast('添加成功')
  }
  onRefresh()

  editShowFlag.value = false
})

function onPageChange(data) {
  listSize.value = data.size
}
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList" reverse @change="onPageChange">
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
        <TheStoryLevelForm :sort="listSize" :confirm-loading="loadingFlag" :item-data="selectStoryItem" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
