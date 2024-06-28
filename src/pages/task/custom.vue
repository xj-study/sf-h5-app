<script setup lang="ts">
import { showToast } from 'vant'
import TheCustomTaskItem from './components/theCustomTaskItem.vue'
import TheTaskForm from './components/theTaskForm.vue'
import type { TaskForm } from './types'
import useLoading from '@/hooks/useLoading'
import { taskAdd, taskQuery, taskUpdate } from '@/api/taskApi'

definePage({
  name: 'taskCustom',
  meta: {
    level: 2,
    title: '任务定制',
  },
})

const listRef = ref(null)
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
    listRef.value.update(item, (ele) => {
      return item.taskId === ele.taskId
    })
  } else {
    // add
    await taskAdd(item)
    showToast('添加成功')
    listRef.value.update(item)
  }
  editShowFlag.value = false
})
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <base-button icon="add" @click="toAdd">
        新增任务
      </base-button>
    </base-head-tool>

    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheCustomTaskItem v-for="data in list" :key="data.id" :item="data" @edit="toEdit" />
      </template>
    </base-refresh-list>
    <base-popup v-model:show="editShowFlag" :title="taskFormTitle">
      <TheTaskForm :confirm-loading="loadingFlag" :item-data="formData" @confirm="onConfirm" />
    </base-popup>
  </base-container>
</template>
