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

const { mainPageRef, listUpdate } = useMainPage()

async function getList() {
  const records = await taskQuery()
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

const { loadingFlag, loading: onConfirm } = useLoading(async (item: TaskForm) => {
  if (item.taskId) {
    // update
    await taskUpdate(item)
    showToast('更新成功')
    listUpdate(item, (ele) => {
      return item.taskId === ele.taskId
    })
  } else {
    // add
    await taskAdd(item)
    showToast('添加成功')
    listUpdate(item)
  }
  editShowFlag.value = false
})
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <base-button icon="add" @click="toAdd">
        新增任务
      </base-button>
    </template>

    <template #default="{ itemData }">
      <TheCustomTaskItem :key="itemData.id" :item="itemData" @edit="toEdit" />
    </template>
    <template #popup>
      <base-popup v-model:show="editShowFlag" :title="taskFormTitle">
        <TheTaskForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
      </base-popup>
    </template>
  </base-main-page>
</template>
