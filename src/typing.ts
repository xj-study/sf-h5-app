import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export enum RecordType {
  TASK = 100,
  ORDER_GIFT = 200,
}

export enum ListType {
  USER = 0, // 用户类型
  MANAGER = 1, // 管理类型，家长去审核孩子的任务
}
