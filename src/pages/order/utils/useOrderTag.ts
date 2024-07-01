import { OrderStatus } from '../typing'
import type { TagItem } from '@/components/typing'
import { TagType } from '@/components/typing'

export default function useOrderTag(props) {
  const unshippedFlag = computed(() => props.item.status === OrderStatus.UNSHIPPED)
  const tagData = computed<TagItem>(() => {
    switch (props.item.status) {
      case OrderStatus.CLOSED:
        return { tag: '已关闭', type: TagType.GRAY }
      case OrderStatus.UNSHIPPED:
        return { tag: '未发货', type: TagType.BLUE }
      case OrderStatus.SHIPPED:
        return { tag: '已发货', type: TagType.GOLD }
      case OrderStatus.SUCCESS:
        return { tag: '成功', type: TagType.GREEN }
      default:
        return { tag: '', type: TagType.GRAY }
    }
  })
  return { tagData, unshippedFlag }
}
