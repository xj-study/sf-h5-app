<script setup lang="ts">
import { showToast } from 'vant'
import { type StoryLevelItem, StoryType } from '../../typing'
import { RulesType } from '@/pages/components/rules/typing'
import { TagType } from '@/components/typing'

// import type { StoryItem } from '../typing'

interface Props {
  item: StoryLevelItem
  type: number
}
const props = defineProps<Props>()
const emits = defineEmits(['start', 'startGamePoint24', 'learnEngWord'])

const isActive: ComputedRef<boolean> = inject('isActive')
const isPass = computed(() => props.item.pass)

function toStart() {
  if (!isActive.value) {
    showToast('活动还没有激活，先激活一下~~')
    return
  }
  if (isPass.value) {
    return
  }

  if (props.item.refType === RulesType.GAME_POINT24) {
    emits('startGamePoint24', props.item)
  } else if (props.item.refType === RulesType.LEARN_ENG_WORD) {
    emits('learnEngWord', props.item)
  } else {
    emits('start', props.item)
  }
}

const isTypeSimple = computed(() => props.type === StoryType.SIMPLE)
const isTypeDetail = computed(() => props.type === StoryType.DETAIL)

function applyStatus(colors) {
  let result = ''
  if (isPass.value) {
    result = colors[0]
  } else if (!isActive.value) {
    result = colors[2]
  } else {
    result = colors[1]
  }
  return result
}

const boxCls = computed(() => {
  const result = ['relative m-10 inline-block h-70 w-70 overflow-hidden rounded-10 border-solid bg-white']
  result.push(applyStatus(['border-amber-3', 'border-green-3', 'border-gray-3']))
  return result
})
const levelTextCls = computed(() => {
  const result = ['text-center text-50 text-white leading-60 text-shadow-lg']
  result.push(applyStatus(['text-shadow-color-amber-6', 'text-shadow-color-green', 'text-shadow-color-gray']))
  return result
})

const tipCls = computed(() => {
  const result = ['absolute top-0 left-0 right-0 bg-op-60 text-center text-white translate-x-18 rotate-45 pl-10']
  result.push(applyStatus(['bg-amber-5', 'bg-green-5', 'bg-gray-5']))
  return result
})

const prizeCls = computed(() => {
  const result = ['absolute bottom-0 left-0 right-0 text-center bg-op-90  text-white']
  result.push(applyStatus(['bg-amber-5', 'bg-green-5', 'bg-gray-5']))
  return result
})

const tipText = computed(() => applyStatus(['pass', '', 'lock']))
</script>

<template>
  <div v-if="isTypeSimple" :class="boxCls" @click="toStart">
    <div :class="levelTextCls">
      {{ item.levelOrder }}
    </div>
    <div :class="tipCls">
      {{ tipText }}
    </div>
    <div v-if="item.prize" :class="prizeCls">
      <span class="pr-4">{{ item.prize }} </span>
      <van-icon name="points" />
    </div>
  </div>

  <div v-if="isTypeDetail" class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag :tag="item.levelOrder" :type="TagType.GREEN" class="mr10" />
        <span> {{ item.title }} </span>
      </div>
      <div v-if="!isPass" class="text-14">
        <span> 奖励：</span>
        <span class="text-20 text-amber-500">{{ item.prize || 0 }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <div v-if="isPass" class="color-green-700">
        <span>已通关</span>
        <span v-if="item.prize">，并获得 <span class="text-amber-500">{{ item.prize }}</span> 积分</span>
      </div>
      <base-button v-else :disabled="!isActive" size="small" plain type="primary" class="min-w-70" @click.stop="toStart">
        挑战
      </base-button>
    </div>
  </div>
</template>
