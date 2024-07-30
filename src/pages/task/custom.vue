<script setup lang="ts">
import { showToast } from 'vant'
import TheCustomTaskItem from './components/theCustomTaskItem.vue'
import TheTaskForm from './components/theTaskForm.vue'
import type { TaskForm } from './types'
import useLoading from '@/hooks/useLoading'
import { taskAdd, taskQuery, taskUpdate } from '@/api/taskApi'
import useMainPage from '@/hooks/useMainPage'

definePage({
  name: 'taskCustom',
  meta: {
    level: 2,
    title: '任务定制',
  },
})

const { mainPageRef, listUpdate, onRefresh } = useMainPage()

const keyword = ref('')
function toSearch() {
  onRefresh()
}

async function getList() {
  const params = { keyword: keyword.value || '' }

  const records = await taskQuery(params)
  return records
}

const editShowFlag = ref(false)
const formData = ref(null)
const taskFormTitle = ref('')

function toEdit(itemData) {
  formData.value = itemData
  taskFormTitle.value = '编辑任务'
  editShowFlag.value = true
}

function toAdd() {
  formData.value = null
  taskFormTitle.value = '新增任务'
  editShowFlag.value = true
}

function toDelete(itemData) {
  listUpdate(itemData, 'id', { remove: true })
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: TaskForm) => {
  if (item.taskId) {
    // update
    await taskUpdate(item)
    showToast('更新成功')
    listUpdate(item, 'taskId')
  } else {
    // add
    const taskId = await taskAdd(item)
    item.taskId = taskId
    showToast('添加成功')
    listUpdate(item)
  }

  setTimeout(() => {
    formData.value = null
  }, 50)
  editShowFlag.value = false
})
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <div class="flex items-center">
        <base-search v-model:input="keyword" class="flex-1" @change="toSearch" />
        <base-button icon="add" size="small" @click="toAdd">
          新增任务
        </base-button>
      </div>
    </template>

    <template #default="{ itemData }">
      <TheCustomTaskItem :key="itemData.id" :item="itemData" @delete="toDelete" @edit="toEdit" />
    </template>
    <template #popup>
      <base-popup v-model:show="editShowFlag" :title="taskFormTitle">
        <TheTaskForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
