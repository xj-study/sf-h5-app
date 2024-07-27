<script setup lang="ts">
import { showToast } from 'vant'
import { QuesType } from '../typing'
import TheLearnEngWord from '../ques/components/theLearnEngWord.vue'
import ThePoint24Game from '../game/point24/components/thePoint24Game.vue'
import { RulesType } from '../components/rules/typing'
import theStoryLevelItem from './level/components/theStoryLevelItem.vue'
import { type StoryLevelItem, type StoryRecordItem, StoryRecordStatus, StoryType } from './typing'
import useMainPage from '@/hooks/useMainPage'
import { storyActive, storyPass, storyRecordQuery } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'
import { TagType } from '@/components/typing'
import router from '@/router'

definePage({
  name: 'storyDetail',
  meta: {
    title: '故事',
  },
})

const { mainPageRef, onRefresh } = useMainPage()
const route = useRoute()
const storyId = (route.params as { id: number }).id
const storyData = ref<StoryRecordItem>()

const storyType = computed(() => {
  if (storyData.value)
    return storyData.value.type || StoryType.DETAIL
  return StoryType.DETAIL
})

async function getList() {
  const data = await storyRecordQuery(storyId)
  storyData.value = data
  document.title = storyData.value.title
  return data.levels
}

const isPass = computed(() => storyData.value.status === StoryRecordStatus.PASS_ALL)
const isActive = computed(() => storyData.value.status !== StoryRecordStatus.NOT_ACTIVE)
provide('isActive', isActive)

function toBack() {
  router.back()
}
// 去激活
const { loadingFlag, loading: toActive } = useLoading(async () => {
  const status = await storyActive(storyData.value.id)
  storyData.value.status = status
  showToast('成功激活！')
})

const currentItem = ref<StoryLevelItem>()
const gamePoint24Show = ref(false)
const isLearnEngWord = ref(false)
const currentRules = computed(() => {
  if (currentItem.value && currentItem.value.refRules) {
    return JSON.parse(currentItem.value.refRules)
  }
  return {}
})
const levelId = computed(() => {
  if (currentItem.value && currentItem.value.refType === RulesType.LEARN_ENG_WORD)
    return currentItem.value.id
  return -1
})
function playGamePoint24(item: StoryLevelItem) {
  currentItem.value = item
  gamePoint24Show.value = true
}
// 开始单词打卡
function onLearnEngWord(item: StoryLevelItem) {
  currentItem.value = item
  isLearnEngWord.value = true
}

function toStart(item: StoryLevelItem) {
  currentItem.value = item
  onComplete()
}

async function onComplete() {
  await storyPass({
    id: storyData.value.id,
    levelId: currentItem.value.id,
    storyTitle: storyData.value.title,
  })
  showToast('恭喜通关！')

  onRefresh()
}
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList" finished-text="">
    <template #head-tool>
      <div v-if="storyData">
        <div class="font-bold">
          <base-tag v-if="isPass" tag="已完成" :type="TagType.GOLD" class="mr10" />
          {{ storyData.title }}
        </div>
        <div class="mt8 text-14">
          {{ storyData.content }}
        </div>
        <div v-if="isActive || isPass" class="mt10">
          <base-button size="small" plain type="primary" icon="arrow-left" class="min-w-60" @click="toBack">
            返回
          </base-button>
        </div>
        <div v-if="!isActive" class="mt10 flex items-center justify-between">
          <div class="text-16">
            <span>门票：</span>
            <span class="text-20 text-amber-500">{{ storyData.costAmount || 0 }}</span>
            <span class="pl-8 text-12">积分</span>
          </div>

          <base-button :loading="loadingFlag" type="primary" size="small" class="min-w-120" @click="toActive">
            激活
          </base-button>
        </div>
      </div>
    </template>
    <template #default="{ itemData }">
      <theStoryLevelItem :key="itemData.id" :type="storyType" :item="itemData" @start="toStart" @start-game-point24="playGamePoint24" @learn-eng-word="onLearnEngWord" />
    </template>

    <template #popup>
      <ThePoint24Game v-model="gamePoint24Show" v-bind="currentRules" task @complete="onComplete" />
      <TheLearnEngWord :id="levelId" v-model="isLearnEngWord" :rules="currentRules" :type="QuesType.STORY_LEVEL" @complete="onComplete" />
    </template>
  </base-main-page>
</template>
