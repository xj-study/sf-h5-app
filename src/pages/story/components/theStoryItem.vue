<script setup lang="ts">
import type { StoryRecordItem } from '../typing'

interface Props {

  item: StoryRecordItem

}
const props = defineProps<Props>()
const router = useRouter()
function toEnter() {
  router.push(`/story/level/${props.item.storyId}`)
}
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div class="flex items-center">
        <span> {{ item.title }} </span>
      </div>
      <div>
        <span>门票：</span>
        <span class="text-20 text-amber-500">{{ item.costAmount || 0 }}</span>
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <base-button class="mt-20 min-w-100" size="small" plain type="primary" @click="toEnter">
      进入
    </base-button>
  </div>
</template>
