<script setup lang="ts">
import TheCustomTaskItem from './components/theCustomTaskItem.vue'
import TheTaskForm from './components/theTaskForm.vue'

definePage({
  name: 'taskCustom',
  meta: {
    level: 2,
    title: '任务定制',
  },
})

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

const editShowFlag = ref(false)

function onItemEdit() {
  editShowFlag.value = true
}
</script>

<template>
  <base-container :padding-x="0">
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheCustomTaskItem v-for="data, index in list" :key="index" :item="data" @edit="onItemEdit" />
      </template>
    </base-refresh-list>
    <base-popup v-model:show="editShowFlag" title="编辑任务">
      <TheTaskForm />
    </base-popup>
  </base-container>
</template>
