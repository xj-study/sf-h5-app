<script setup lang="ts">
import { showToast } from 'vant'
import thePoint24Game from '../game/point24/components/thePoint24Game.vue'
import theStoryLevelItem from './level/components/theStoryLevelItem.vue'
import { type StoryLevelItem, type StoryRecordItem, StoryRecordStatus } from './typing'
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
const currentRules = computed(() => {
  if (currentItem.value && currentItem.value.refRules) {
    return JSON.parse(currentItem.value.refRules)
  }
  return null
})
function playGamePoint24(item: StoryLevelItem) {
  currentItem.value = item
  gamePoint24Show.value = true
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
  <base-main-page ref="mainPageRef" :get-list="getList" reverse>
    <template #head-tool>
      <div v-if="storyData">
        <div class="font-bold">
          <base-tag v-if="isPass" tag="已完成" :type="TagType.GOLD" class="mr10" />
          {{ storyData.title }}
        </div>
        <div class="mt8 text-14">
          {{ storyData.content }}
        </div>
        <div v-if="isPass" class="mt10">
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
      <theStoryLevelItem :key="itemData.id" :item="itemData" @start="toStart" @start-game-point24="playGamePoint24" />
    </template>

    <template #popup>
      <thePoint24Game v-model="gamePoint24Show" v-bind="currentRules" task @complete="onComplete" />
    </template>
  </base-main-page>
</template>
