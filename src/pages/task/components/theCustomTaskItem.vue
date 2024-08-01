<script setup lang="ts">
import type { TaskForm } from '../types'
import { taskDelete } from '@/api/taskApi'
import { type TagItem, TagType } from '@/components/typing'
import useLoading from '@/hooks/useLoading'

interface Props {
  item: TaskForm
}
const props = defineProps<Props>()
const emits = defineEmits(['edit', 'delete'])

function onEdit() {
  emits('edit', props.item)
}

const { loadingFlag, loading: toDelete } = useLoading(async () => {
  await taskDelete(props.item.taskId)
  emits('delete', props.item)
})

const tags = computed<TagItem[]>(() => {
  if (props.item.tagStr) {
    return props.item.tagStr.split(',').map(tag => ({ tag, type: TagType.BLUE }))
  }
  return []
})
</script>

<template>
  <van-swipe-cell>
    <div class="m-10 bg-white p-10">
      <div class="flex justify-between text-16">
        <span>{{ item.title }} </span>
        <div class="text-amber-500">
          <span class="text-20">{{ item.integral }}</span>
          <van-icon name="points" class="ml-4" />
        </div>
      </div>

      <div class="mt-8">
        <base-tag v-for="tagItem in tags" :key="tagItem.tag" class="mr-4" v-bind="tagItem" />
      </div>
      <div v-if="item.content" class="mt-8 text-14">
        {{ item.content }}
      </div>

      <div class="mt-20">
        <base-button size="small" plain type="primary" class="min-w-100" @click="onEdit">
          修改
        </base-button>
      </div>
    </div>
    <template #right>
      <base-button square class="h-full" :loading="loadingFlag" type="danger" @click="toDelete">
        删除
      </base-button>
    </template>
  </van-swipe-cell>
</template>
