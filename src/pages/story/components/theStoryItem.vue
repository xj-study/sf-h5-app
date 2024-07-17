<script setup lang="ts">
import { type StoryRecordItem, StoryRecordStatus } from '../typing'
import { TagType } from '@/components/typing'

interface Props {

  item: StoryRecordItem

}
const props = defineProps<Props>()
const router = useRouter()
function toEnter() {
  router.push(`/story/${props.item.storyId}`)
}
const isPass = computed(() => props.item.status === StoryRecordStatus.PASS_ALL)
</script>

<template>
  <div class="m-10 bg-white p-10" @click="toEnter">
    <div class="flex justify-between text-16 font-bold">
      <div class="flex items-center">
        <base-tag v-if="isPass" tag="已完成" :type="TagType.GOLD" class="mr10" />
        <span> {{ item.title }} </span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div v-if="!isPass" class="mt-20">
      <base-button class="min-w-100" size="small" plain type="primary">
        进入
      </base-button>
    </div>
  </div>
</template>
