import { type StoryItem, StoryStatusType } from '../typing'

export default function useStoryStatus(storyItem: StoryItem) {
  const isStatusNotPublish = computed(() => storyItem.status === StoryStatusType.NOT_PUBLISH)
  const isStatusPublished = computed(() => storyItem.status === StoryStatusType.PUBLISHED)
  const isStatusOffShelf = computed(() => storyItem.status === StoryStatusType.OFF_SHELF)

  return { isStatusNotPublish, isStatusPublished, isStatusOffShelf }
}
