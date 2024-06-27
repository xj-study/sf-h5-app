<script setup lang="ts">
import TheTaskItem from './components/theTaskItem.vue'
import { TaskListType } from './types'
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
    { title: '全部', value: 0 },
    { title: '未完成', value: 1 },
    { title: '已完成', value: 2 },
    // { title: '待审核', value: 3 },
  ]
  return result
})

const route = useRoute()
const routeQuery = computed<TaskRecordQuery>(() => {
  return route.query
})
const taskListType = computed(() => {
  return routeQuery.value.id ? TaskListType.MANAGER : TaskListType.USER
})

const listRef = ref(null)
async function getList() {
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
      <van-tabs title="">
        <van-tab v-for="data in taskTabs" :key="data.value" :title="data.title" :name="data.value" />
      </van-tabs>
    </base-head-tool>
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheTaskItem v-for="data, index in list" :key="index" :type="taskListType" :item="data" @update="onItemUpdate" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
