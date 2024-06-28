<script setup lang="ts">
import { showToast } from 'vant'

import TheCustomGiftItem from './components/theCustomGiftItem.vue'
import TheGiftForm from './components/theGiftForm.vue'
import type { GiftForm } from './typing'
import { giftAdd, giftQuery, giftUpdate } from '@/api/giftApi'
import useLoading from '@/hooks/useLoading'

definePage({
  name: 'giftCustom',
  meta: {
    level: 2,
    title: '礼物管理',
  },
})

const listRef = ref(null)
async function getList() {
  const records = await giftQuery()
  return records
}

const editShowFlag = ref(false)
const formData = ref(null)

function toEdit(itemData) {
  formData.value = itemData
  editShowFlag.value = true
}

function toOffShelf() {
  //
  showToast('操作成功')
}

function toAdd() {
  formData.value = null
  editShowFlag.value = true
}

function resetPopup() {
  formData.value = null
  editShowFlag.value = false
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: GiftForm) => {
  if (item.giftId) {
    // update
    await giftUpdate(item)
    showToast('更新成功')
    listRef.value.update(item, (ele) => {
      return item.giftId === ele.giftId
    })
    resetPopup()
  } else {
    // add
    await giftAdd(item)
    showToast('添加成功')
    listRef.value.update(item)
    resetPopup()
  }
})
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <base-button icon="add" @click="toAdd">
        新增礼物
      </base-button>
    </base-head-tool>

    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheCustomGiftItem v-for="data in list" :key="data.id" :item="data" @edit="toEdit" @off-shelf="toOffShelf" />
      </template>
    </base-refresh-list>
    <base-popup v-model:show="editShowFlag" title="编辑礼物">
      <TheGiftForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
    </base-popup>
  </base-container>
</template>
