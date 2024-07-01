import { isCompleteStatus, isInitStatus, isWaitVerifyStatus } from '../utils/taskStatusUtils'
import { type TagItem, TagType } from '@/components/typing'

export default function useTaskTag(props) {
  const statusCompleteFlag = computed(() => isCompleteStatus(props.item.status))
  const statusInitFlag = computed(() => isInitStatus(props.item.status))
  const statusWaitVerifyFlag = computed(() => isWaitVerifyStatus(props.item.status))
  const tagData = computed<TagItem>(() => {
    if (statusInitFlag.value) {
      return { tag: '未完成', type: TagType.RED }
    }
    if (statusWaitVerifyFlag.value) {
      return { tag: '待审核', type: TagType.BLUE }
    }
    if (statusCompleteFlag.value) {
      return { tag: '已完成', type: TagType.GREEN }
    }
    return { tag: '', type: TagType.GRAY }
  })
  return { tagData, statusInitFlag, statusWaitVerifyFlag }
}
