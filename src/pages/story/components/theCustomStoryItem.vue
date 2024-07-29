<script setup lang="ts">
import { type StoryItem, StoryStatusType } from '../typing'
import { storyOffShelf, storyPublish } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'

interface Props {
  item: StoryItem
}
const props = defineProps<Props>()
const emits = defineEmits(['edit', 'update'])

const isStatusPublished = computed(() => props.item.status === StoryStatusType.PUBLISHED)

function onEdit() {
  emits('edit', props.item)
}

const router = useRouter()
function onLevelManager() {
  router.push(`/story/level/${props.item.id}/custom?type=${props.item.type}`)
}

const { loadingFlag: publishLoading, loading: toPublish } = useLoading(async () => {
  const status = await storyPublish(props.item.id)

  emits('update', props.item, status)
})

const { loadingFlag: offShelfLoading, loading: toOffShelf } = useLoading(async () => {
  const status = await storyOffShelf(props.item.id)
  emits('update', props.item, status)
})
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
        <van-icon name="points text-amber-500" class="ml-4" />
      </div>
    </div>

    <div class="mt-8 truncate text-14">
      {{ item.content }}
    </div>

    <div class="mt-20">
      <base-button size="small" plain class="min-w-80" @click.stop="onEdit">
        修改
      </base-button>
      <base-button size="small" plain class="ml10 min-w-80" @click.stop="onLevelManager">
        关卡管理
      </base-button>
      <base-button v-if="!isStatusPublished" :loading="publishLoading" size="small" plain type="primary" class="ml10 min-w-80" @click.stop="toPublish">
        发布
      </base-button>
      <base-button v-if="isStatusPublished" :loading="offShelfLoading" size="small" plain type="warning" class="ml10 min-w-80" @click.stop="toOffShelf">
        下架
      </base-button>
    </div>
  </div>
</template>
