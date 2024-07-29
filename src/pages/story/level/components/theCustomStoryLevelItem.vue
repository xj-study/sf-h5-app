<script setup lang="ts">
import { type StoryLevelItem, StoryType } from '../../typing'
import { type TagItem, TagType } from '@/components/typing'

interface Props {
  item: StoryLevelItem
  type: number
}
const props = defineProps<Props>()

const emits = defineEmits(['edit', 'remove', 'copy'])

const tagItem = computed<TagItem>(() => {
  let tag: number | string = props.item.levelOrder
  if (tag <= 0) {
    tag = '-'
  }
  return { type: TagType.GREEN, tag: `${tag}` }
})

const isTypeSimple = computed(() => props.type === StoryType.SIMPLE)
const isTypeDetail = computed(() => props.type === StoryType.DETAIL)

const boxCls = computed(() => {
  const result = ['relative transition m-10 border-blue-5 inline-block h-70 w-70 overflow-hidden rounded-10 border-solid bg-white']
  return result
})
const levelTextCls = computed(() => {
  const result = ['text-center transition text-50 text-shadow-color-blue text-white leading-60 text-shadow-lg']

  return result
})
const prizeCls = computed(() => {
  const result = ['absolute transition bg-blue-5 bottom-0 left-0 right-0 text-center bg-op-90  text-white']

  return result
})

function toEdit() {
  emits('edit', props.item)
}
function toCopy() {
  emits('copy', props.item)
}
</script>

<template>
  <div v-if="isTypeSimple" :class="boxCls" @click="toEdit">
    <div :class="levelTextCls">
      {{ item.levelOrder }}
    </div>

    <div class="absolute right-0 top-0 rounded-4 p-4 text-18 color-green-9" @click.stop="toCopy">
      <van-icon name="add-o" />
    </div>

    <div v-if="item.prize" :class="prizeCls">
      <span class="pr-4">{{ item.prize }} </span>
      <van-icon name="points" />
    </div>
  </div>

  <div v-if="isTypeDetail" class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <base-tag v-bind="tagItem" class="mr10" />
        <span> {{ item.title }} </span>
      </div>
      <div v-if="item.prize">
        <span>奖励：</span>
        <span class="text-20 text-amber-500">{{ item.prize }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <base-button size="small" plain type="primary" class="min-w-80" @click.stop="toEdit">
        修改
      </base-button>
    </div>
  </div>
</template>
