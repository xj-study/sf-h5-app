<script setup lang="ts">
import TheTaskItem from './components/theTaskItem.vue'
import { TaskListType, TaskStatus } from './types'
import type { TaskRecordQuery } from '@/api/typing'
import { recordQuery } from '@/api/taskApi'

definePage({
  name: 'task',
  meta: {
    level: 2,
    title: '任务列表',
  },
})
interface TaskTab {
  title: string
  value: number
}
const taskTabs = computed<TaskTab[]>(() => {
  const result = [
    { title: '全部', value: -1 },
    { title: '未完成', value: TaskStatus.INIT },
    { title: '已完成', value: TaskStatus.COMPLETE },
    { title: '待审核', value: TaskStatus.WATIT_VERIFY },
  ]
  return result
})
const currentTabs = ref(-1)

const listRef = ref(null)
function onChange() {
  listRef.value.onRefresh()
}

const route = useRoute()
const routeQuery = computed<TaskRecordQuery>(() => {
  return route.query
})
const taskListType = computed(() => {
  return routeQuery.value.id ? TaskListType.MANAGER : TaskListType.USER
})

async function getList() {
  routeQuery.value.status = currentTabs.value === -1 ? undefined : currentTabs.value
  const records = await recordQuery(routeQuery.value)
  return records
}

function onItemUpdate(data) {
  listRef.value.update(data, (item) => {
    return item.taskId === data.taskId
  })
}
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <van-tabs v-model:active="currentTabs" title="" @change="onChange">
        <van-tab v-for="data in taskTabs" :key="data.value" :title="data.title" :name="data.value" />
      </van-tabs>
    </base-head-tool>
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheTaskItem v-for="data in list" :key="data.id" :type="taskListType" :item="data" @update="onItemUpdate" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
