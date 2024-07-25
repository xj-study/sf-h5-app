import type { Word } from '../words/typing'

export enum QuesWordType {
  SELECT = 10,
  SELECT_VIDEO = 11,
  FILL = 20,
  FILL_VIDEO = 21,
}

export enum QuesWordFillLevelType {
  // 简单
  SIMPLE = 1,
  // 中等
  MIDDLE = 2,
  // 极难
  DIFFCULTY = 3,
}

export enum QuesAnswerStatus {
  EMPTY = 0, // 空，还没有做答
  NOT_EMPTY, // 不为空
  RIGHT, // 正确
  ERROR, // 错误
}

export interface QuesData {
  id: number
  list: QuesWordData[]
}

export interface QuesWordData {
  id: number
  wordId: number
  enValue: string
  zhValue: string
  fillLevel: number
  type: number
  optionList: Word[]

  answer?: QuesAnswerData
}

export interface QuesFillBox {
  value: string
  input: boolean
  select: boolean
}

export interface QuesAnswerData {
  status: QuesAnswerStatus
  index?: number
  boxs?: QuesFillBox[]
  right?: boolean
}

export interface QuesAnswerSubmitData {
  quesWordId: number
  userAnswer: string
  wrongFlag: boolean
  options?: string
}
