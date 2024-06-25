<script setup lang="ts">
import TheGiftItem from './components/theGiftItem.vue'

definePage({
  name: 'gift',
  meta: {
    level: 2,
    title: '任务列表',
  },
})

const listRef = ref(null)
async function getList() {
  const task = {
    title: '贴贴纸',
    content: '非常好看的贴贴纸',
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
    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ list }">
        <TheGiftItem v-for="data, index in list" :key="index" :item="data" @verify="onItemVerify" />
      </template>
    </base-refresh-list>
  </base-container>
</template>
