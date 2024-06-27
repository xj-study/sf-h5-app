<script setup lang="ts">
import { showToast } from 'vant'

import TheCustomGiftItem from './components/theCustomGiftItem.vue'
import TheGiftForm from './components/theGiftForm.vue'

definePage({
  name: 'giftCustom',
  meta: {
    level: 2,
    title: '礼物管理',
  },
})

const listRef = ref(null)
function getList() {
  const task = {
    title: '贴贴纸',
    content: '非常好看的贴贴纸',
    price: 100,
  }
  const records = []
  for (let i = 0; i < 18; i++) {
    records.push(task)
  }
  return {
    records,
    size: 20,
  }
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

async function onConfirm() {
  editShowFlag.value = false

  showToast('操作成功')
}
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
      <TheGiftForm :item-data="formData" @confirm="onConfirm" />
    </base-popup>
  </base-container>
</template>
