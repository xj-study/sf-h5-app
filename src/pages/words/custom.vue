<script setup lang="ts">
import { showToast } from 'vant'
import theCustomWordItem from './components/theCustomWordItem.vue'
import type { Word } from './typing'
import { WordLevels } from './typing'
import { wordAdd, wordQueryList, wordTranslate, wordUpdate } from '@/api/wordApi'

import useLoading from '@/hooks/useLoading'
import useMainPage from '@/hooks/useMainPage'
import type { PageResult } from '@/api/typing'

definePage({
  name: 'words',
  meta: {
    title: '词库',
  },
})

const { mainPageRef, onRefresh } = useMainPage()
const keyword = ref('')
const currentWordLevel = ref(0)
const translate = ref('')
const currentWord = ref<Word>()

const isTypeUpdate = computed(() => currentWord.value && currentWord.value.id)
const btnSubmitText = computed(() => {
  if (isTypeUpdate.value) {
    return '快速修改'
  }
  return '快速新增'
})

async function getTranslate() {
  if (keyword.value === '')
    return
  const result = await wordTranslate(keyword.value)
  translate.value = result
}

function updateWord(word: Word) {
  keyword.value = word.enValue
  currentWordLevel.value = word.level
  translate.value = word.zhValue
  currentWord.value = word
}

function searchWord(list: Word[]) {
  const item = list.find(item => item.enValue === keyword.value)
  if (item) {
    item.select = true
    updateWord(item)
  } else {
    getTranslate()
  }
}

const { loadingFlag, loading } = useLoading(async (query) => {
  const pageResult: PageResult<Word> = await wordQueryList(query)
  return pageResult
})

async function getList(query) {
  if (keyword.value === '')
    return []

  query.keyword = keyword.value
  const pageResult: PageResult<Word> = await loading(query)

  searchWord(pageResult.records)
  return pageResult
}

function toSearch() {
  currentWord.value = null
  currentWordLevel.value = 0
  translate.value = ''

  onRefresh()
}

const { loading: toSubmit, loadingFlag: submitLoading } = useLoading(async () => {
  const enValue = keyword.value
  const zhValue = translate.value
  const level = currentWordLevel.value
  if (isTypeUpdate.value) {
    currentWord.value.zhValue = zhValue
    currentWord.value.level = level
    await wordUpdate(currentWord.value)
  } else {
    currentWord.value = { enValue, zhValue, level }
    const id = await wordAdd(currentWord.value)
    currentWord.value.id = id
  }
  showToast('操作成功')
  onRefresh()
})

function toSelect(item: Word) {
  updateWord(item)
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
        <base-button :loading="submitLoading" class="mt-8" type="primary" size="small" plain @click="toSubmit">
          {{ btnSubmitText }}
        </base-button>
      </div>
    </template>

    <template #default="{ itemData }">
      <theCustomWordItem :key="itemData.id" :item="itemData" @select="toSelect" />
    </template>
  </base-main-page>
</template>
