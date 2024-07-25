<script setup lang="ts">
import { QuesType } from '../typing'
import TheLearnEngWord from '../ques/components/theLearnEngWord.vue'
import TheTaskItem from './components/theTaskItem.vue'
import type { TaskForm } from './types'
import { TaskDateType, TaskStatus } from './types'
import ThePoint24Game from '@/pages/game/point24/components/thePoint24Game.vue'
import type { TaskRecordQuery } from '@/api/typing'
import { recordQuery } from '@/api/taskApi'
import type { TabItem } from '@/components/typing'
import { ListType } from '@/typing'

import useMainPage from '@/hooks/useMainPage'

definePage({
  name: 'task',
  meta: {
    level: 2,
    title: '任务列表',
  },
})

//
const taskDateTabs = [
  { title: '今天', value: TaskDateType.TODAY },
  { title: '昨天', value: TaskDateType.YESTODAY },

]

const taskTabs = computed<TabItem[]>(() => {
  const result = [
    { title: '未打卡', value: TaskStatus.INIT },
    { title: '待审核', value: TaskStatus.WATIT_VERIFY },
    { title: '已打卡', value: TaskStatus.COMPLETE },
    { title: '全部', value: -1 },
  ]
  return result
})
const route = useRoute()
const routeQuery = computed<TaskRecordQuery>(() => {
  return route.query
})

const currentDateTabs = ref(TaskDateType.TODAY)
const tab = routeQuery.value.tab
const currentTabs = ref(tab === null ? -1 : +tab)

const { mainPageRef, onRefresh, listUpdate } = useMainPage()

function onChange() {
  onRefresh()
}

const taskListType = computed(() => {
  return routeQuery.value.id ? ListType.MANAGER : ListType.USER
})

async function getList() {
  routeQuery.value.date = currentDateTabs.value
  routeQuery.value.status = currentTabs.value === -1 ? undefined : currentTabs.value
  const records = await recordQuery(routeQuery.value)
  return records
}

function onItemUpdate(data) {
  listUpdate(data, 'taskId')
}

const currentTaskItem = ref<TaskForm>(null)
const rules = computed(() => {
  if (currentTaskItem.value) {
    return JSON.parse(currentTaskItem.value.rules || '{}')
  }
  return {}
})
const taskId = computed(() => {
  if (currentTaskItem.value)
    return currentTaskItem.value.taskId
  return -1
})
const isGamePoint24 = ref(false)
const isLearnEngWord = ref(false)
let compeleteFn: () => Promise<undefined> = null
// 开始游戏 24 点
function onGamePoint24(itemData: TaskForm, fn) {
  compeleteFn = fn
  currentTaskItem.value = itemData
  isGamePoint24.value = true
}

// 开始单词打卡
function onLearnEngWord(itemData: TaskForm, fn) {
  compeleteFn = fn
  currentTaskItem.value = itemData
  isLearnEngWord.value = true
}

async function onComplete() {
  await compeleteFn()
}
</script>

<template>
  <base-main-page ref="mainPageRef" :head-tool-padding="false" :get-list="getList">
    <template #head-tool>
      <div>
        <base-tabs v-model="currentDateTabs" class="pb4" :list="taskDateTabs" @change="onChange" />
        <base-tabs v-model="currentTabs" type="card" line-height="2" :border="true" :list="taskTabs" @change="onChange" />
      </div>
    </template>
    <template #default="{ itemData }">
      <TheTaskItem
        :key="itemData.id"
        :type="taskListType"
        :date="currentDateTabs"
        :item="itemData"
        @game-point24="onGamePoint24"
        @learn-eng-word="onLearnEngWord"
        @update="onItemUpdate"
      />
    </template>
    <template #popup>
      <ThePoint24Game v-model="isGamePoint24" v-bind="rules" task @complete="onComplete" />
      <TheLearnEngWord :id="taskId" v-model="isLearnEngWord" :type="QuesType.TASK" @complete="onComplete" />
    </template>
  </base-main-page>
</template>
