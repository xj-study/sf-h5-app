enum TaskStatus {
  INIT = 0,
  WATIT_VERIFY = 100,
  COMPLETE = 200,
}

export function isCompleteStatus(status: number) {
  return TaskStatus.COMPLETE === status
}

export function isInitStatus(status: number) {
  return TaskStatus.INIT === status
}

export function isWaitVerifyStatus(status: number) {
  return TaskStatus.WATIT_VERIFY === status
}
