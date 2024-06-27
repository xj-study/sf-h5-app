import type { TagType } from 'vant'
import { isCompleteStatus, isInitStatus, isWaitVerifyStatus } from '../utils/taskStatusUtils'

export default function useTaskTag(props) {
  const statusCompleteFlag = computed(() => isCompleteStatus(props.item.status))
  const statusInitFlag = computed(() => isInitStatus(props.item.status))
  const statusWaitVerifyFlag = computed(() => isWaitVerifyStatus(props.item.status))
  const tagData = computed<{ text: string, type: TagType }>(() => {
    if (statusInitFlag.value) {
      return { text: '未完成', type: 'warning' }
    }
    if (statusWaitVerifyFlag.value) {
      return { text: '待审核', type: 'primary' }
    }
    if (statusCompleteFlag.value) {
      return { text: '已完成', type: 'success' }
    }
    return { text: '', type: 'default' }
  })
  return { tagData, statusInitFlag }
}
