<script setup lang="ts">
import { showToast } from 'vant'
import theCustomWordItem from './components/theCustomWordItem.vue'
import type { Word } from './typing'
import { WordLevels } from './typing'
import { wordAdd, wordQueryList, wordQueryStat, wordRemove, wordTranslate, wordUpdate } from '@/api/wordApi'

import useLoading from '@/hooks/useLoading'
import useMainPage from '@/hooks/useMainPage'
import type { PageResult } from '@/api/typing'
import { TagType } from '@/components/typing'

definePage({
  name: 'words',
  meta: {
    title: '词库',
  },
})

const { mainPageRef, onRefresh, listUpdate } = useMainPage()
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

const statInfo = ref([0, 0, 0, 0, 0])
const level = ref(-1)
const levelsType = [
  TagType.GRAY,
  TagType.GREEN,
  TagType.BLUE,
  TagType.GOLD,
  TagType.RED,
]
const statLevels = computed(() => {
  return statInfo.value.map((val, index) => ({ tag: val, type: levelsType[index] }))
})
watch(level, () => {
  if (keyword.value)
    return
  onRefresh()
})
watch(keyword, () => {
  level.value = -1
})

// 取得统计数据
async function queryStatInfo() {
  const result = await wordQueryStat()
  statInfo.value = result
}

const { loadingFlag, loading } = useLoading(async (query) => {
  const pageResult: PageResult<Word> = await wordQueryList(query)
  return pageResult
})

async function getList(query) {
  if (keyword.value === '' && level.value === -1)
    return []

  keyword.value && (query.keyword = keyword.value)
  if (level.value !== -1 && !keyword.value) {
    query.level = level.value
  }
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
  const wordLevel = currentWordLevel.value
  if (isTypeUpdate.value) {
    currentWord.value.zhValue = zhValue
    currentWord.value.level = wordLevel
    await wordUpdate(currentWord.value)
  } else {
    currentWord.value = { enValue, zhValue, level: wordLevel }
    const id = await wordAdd(currentWord.value)
    currentWord.value.id = id
  }
  // 更新统计数据
  queryStatInfo()

  showToast('操作成功')
  onRefresh()
})

function toSelect(item: Word) {
  updateWord(item)
  onRefresh()
}

async function toRemove(item: Word) {
  await wordRemove(item.id)
  listUpdate(item, 'id', { remove: true })
  if (currentWord.value && item.id === currentWord.value.id) {
    currentWord.value.id = null
  }
  await queryStatInfo()
}

onMounted(() => {
  queryStatInfo()
})
</script>

<template>
  <base-main-page ref="mainPageRef" :head-tool-padding="false" :get-list="getList">
    <template #head-tool>
      <base-search v-model:input="keyword" @change="toSearch" />
      <div class="flex">
        <base-tag-select v-model="level" class="p-x-10 pb-4" :list="statLevels" />
      </div>
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
      <theCustomWordItem :key="itemData.id" :item="itemData" @select="toSelect" @remove="toRemove" />
    </template>
  </base-main-page>
</template>
