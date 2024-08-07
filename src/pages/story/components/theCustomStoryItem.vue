<script setup lang="ts">
import type { StoryItem } from '../typing'
import useStoryStatus from '../utils/useStoryStatus'
import { storyOffShelf, storyPublish } from '@/api/storyApi'
import useLoading from '@/hooks/useLoading'

interface Props {
  item: StoryItem
}
const props = defineProps<Props>()
const emits = defineEmits(['edit', 'remove'])
const { isStatusNotPublish, isStatusOffShelf, isStatusPublished } = useStoryStatus(props.item)

function onEdit() {
  emits('edit', props.item)
}

const router = useRouter()
function onLevelManager() {
  router.push(`/story/level/${props.item.id}/custom`)
}

const { loadingFlag: publishLoading, loading: toPublish } = useLoading(async () => {
  await storyPublish(props.item.id)
  emits('remove', props.item)
})

const { loadingFlag: offShelfLoading, loading: toOffShelf } = useLoading(async () => {
  await storyOffShelf(props.item.id)
  emits('remove', props.item)
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
        <span class="pl-8 text-12">积分</span>
      </div>
    </div>

    <div class="mt-8 text-14">
      {{ item.content }}
    </div>

    <div v-if="isStatusNotPublish" class="mt-20">
      <base-button size="small" plain class="min-w-80" @click.stop="onEdit">
        修改
      </base-button>
      <base-button size="small" plain class="ml10 min-w-80" @click.stop="onLevelManager">
        关卡管理
      </base-button>

      <base-button :loading="publishLoading" size="small" plain type="primary" class="ml10 min-w-80" @click.stop="toPublish">
        发布
      </base-button>
    </div>
    <div v-else-if="isStatusPublished" class="mt20">
      <base-button :loading="offShelfLoading" size="small" plain type="warning" class="min-w-80" @click.stop="toOffShelf">
        下架
      </base-button>
    </div>
    <div v-else-if="isStatusOffShelf" class="mt20">
      <base-button size="small" plain class="min-w-80" @click.stop="onEdit">
        修改
      </base-button>
      <base-button size="small" plain class="ml10 min-w-80" @click.stop="onLevelManager">
        关卡管理
      </base-button>
      <base-button :loading="publishLoading" size="small" plain type="primary" class="ml10 min-w-80" @click.stop="toPublish">
        发布
      </base-button>
    </div>
  </div>
</template>
