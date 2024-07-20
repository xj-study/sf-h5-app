<script setup lang="ts">
import theCustomWordItem from './components/theCustomWordItem.vue'
import { WordLevels } from './typing'
import { wordQueryList } from '@/api/wordApi'

import useLoading from '@/hooks/useLoading'
import useMainPage from '@/hooks/useMainPage'

definePage({
  name: 'words',
  meta: {
    title: '词库',
  },
})

const { mainPageRef, onRefresh } = useMainPage()
const keyword = ref('')
const currentWordLevel = ref(0)
const translate = ref('好的')

const { loadingFlag, loading } = useLoading(async (query) => {
  const pageResult = await wordQueryList(query)
  return pageResult
})

async function getList(query) {
  if (keyword.value === '')
    return []

  query.keyword = keyword.value
  const pageResult = await loading(query)

  return pageResult
}

function toSearch() {
  onRefresh()
}
</script>

<template>
  <base-main-page ref="mainPageRef" :head-tool-padding="false" :get-list="getList">
    <template #head-tool>
      <base-search v-model:input="keyword" @change="toSearch" />
      <div v-show="keyword" class="p-10">
        <div class="flex items-center justify-between">
          <span class="pr-10 text-16 font-bold">
            {{ keyword }}
          </span>
          <base-tag-select v-model="currentWordLevel" :list="WordLevels" />
        </div>
        <van-field v-model="translate" :disabled="loadingFlag" :border="false" class="m-y-8 bg-[rgba(0,0,0,0.03)] p-4" label="" placeholder="" />
        <base-button class="mt-8" type="primary" size="small" plain>
          快速新增
        </base-button>
      </div>
    </template>

    <template #default="{ itemData }">
      <theCustomWordItem :key="itemData.id" :item="itemData" />
    </template>
  </base-main-page>
</template>
