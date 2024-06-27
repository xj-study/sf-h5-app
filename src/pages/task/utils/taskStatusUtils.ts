import { TaskStatus } from '../types'

export function isCompleteStatus(status: number) {
  return TaskStatus.COMPLETE === status
}

export function isInitStatus(status: number) {
  return TaskStatus.INIT === status
}

export function isWaitVerifyStatus(status: number) {
  return TaskStatus.WATIT_VERIFY === status
}
