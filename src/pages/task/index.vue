<script setup lang="ts">
import TheTaskItem from './components/theTaskItem.vue'

definePage({
  name: 'task',
  meta: {
    level: 2,
    title: '任务中心',
  },
})

const active = ref(0)

const listRef = ref(null)
function getList() {
  const task = {
    title: '任务标题1',
    content: '任务内容1',
    status: 100,
    index: 0,
  }
  const records = []
  for (let i = 0; i < 18; i++) {
    records.push({ ...task, index: i })
  }
  return {
    records,
    size: 20,
  }
}

function onItemVerify(item) {
  listRef.value.list[item.index].status = 200
}
</script>

<template>
  <base-container :padding-x="0">
    <van-tabs v-model:active="active" sticky offset-top="46">
      <van-tab title="孩子的任务">
        <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
          <template #default="{ list }">
            <TheTaskItem v-for="data, index in list" :key="index" :item="data" @verify="onItemVerify" />
          </template>
        </base-refresh-list>
      </van-tab>
      <van-tab title="我的任务">
        <!-- <base-refresh-list ref="listRef" :get-list="getList">
          <template #default="{ list }">
            <TheTaskItem v-for="data in list" :key="data.i" :item="data" />
          </template>
        </base-refresh-list> -->
      </van-tab>
    </van-tabs>
  </base-container>
</template>
