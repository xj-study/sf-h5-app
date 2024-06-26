<script setup lang="ts">
import TheTaskItem from './components/theTaskItem.vue'

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
    { title: '待审核', value: 3 },
  ]
  return result
})

const listRef = ref(null)
async function getList() {
  const task = {
    title: '任务标题1',
    content: '任务内容1',
    status: 100,
    index: 0,
  }
  const records = []
  for (let i = 0; i < 10; i++) {
    records.push({ ...task, index: i })
  }
  await delay(1000)
  return {
    records,
    size: 10,
  }
}

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, timeout)
  })
}

function onItemVerify() {

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
        <TheTaskItem v-for="data, index in list" :key="index" :item="data" @verify="onItemVerify" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
