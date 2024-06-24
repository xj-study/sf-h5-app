<script setup lang="ts">
definePage({
  name: 'task',
  meta: {
    level: 2,
    title: '任务中心',
  },
})

const listRef = ref(null)
async function getList() {
  const records: object[] = []
  for (let i = 0; i < 20; i++) records.push({ i })
  await delay(800)
  return {
    records,
    size: 20,
  }
}
function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration)
  })
}
</script>

<template>
  <base-container>
    <base-refresh-list ref="listRef" :get-list="getList" class="h-full pt-16">
      <template #default="{ list }">
        <div v-for="data in list" :key="data.i" class="h-48 bg-white">
          task item {{ data.i }}
        </div>
      </template>
    </base-refresh-list>
  </base-container>
</template>
