import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export enum RecordType {
  TASK = 100,
}

export enum OrderType {
  GIFT = 100,
}
