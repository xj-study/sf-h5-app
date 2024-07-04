<script setup lang="ts">
import TheTaskItem from './components/theTaskItem.vue'
import { TaskStatus } from './types'
import type { TaskRecordQuery } from '@/api/typing'
import { recordQuery } from '@/api/taskApi'
import type { TabItem } from '@/components/typing'
import { ListType } from '@/typing'

import ThePoint24Game from '@/pages/game/point24/components/thePoint24Game.vue'

definePage({
  name: 'task',
  meta: {
    level: 2,
    title: '任务列表',
  },
})
const taskTabs = computed<TabItem[]>(() => {
  const result = [
    { title: '全部', value: -1 },
    { title: '未完成', value: TaskStatus.INIT },
    { title: '待审核', value: TaskStatus.WATIT_VERIFY },
    { title: '已完成', value: TaskStatus.COMPLETE },
  ]
  return result
})
const route = useRoute()
const routeQuery = computed<TaskRecordQuery>(() => {
  return route.query
})
const tab = routeQuery.value.tab
const currentTabs = ref(tab === null ? -1 : +tab)

const listRef = ref(null)
function onChange() {
  listRef.value.onRefresh()
}

const taskListType = computed(() => {
  return routeQuery.value.id ? ListType.MANAGER : ListType.USER
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

const gamePoint24Flag = ref(false)
// 开始游戏 24 点
function onGamePoint24() {
  gamePoint24Flag.value = true
}
</script>

<template>
  <base-container :padding-x="0">
    <base-head-tool>
      <base-tabs v-model="currentTabs" :list="taskTabs" @change="onChange" />
    </base-head-tool>
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheTaskItem v-for="data in list" :key="data.id" :type="taskListType" :item="data" @game-point24="onGamePoint24" @update="onItemUpdate" />
      </template>
    </base-refresh-list>
  </base-container>
  <ThePoint24Game v-model="gamePoint24Flag" practice />
</template>
