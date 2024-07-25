import { RulesType } from '../components/rules/typing'

export interface StoryItem {
  id?: number
  title: string
  content: string
  costAmount: number
  status: number
}

export enum StoryStatusType {
  // 未发布
  NOT_PUBLISH = 0,
  // 已发布
  PUBLISHED = 1,
  // 已下架
  OFF_SHELF = 2,
}

export interface StoryQuery {
  status?: number
}

export class StoryLevelItem {
  id?: number
  levelOrder: number = 0
  title: string = ''
  content: string = ''
  prize: number = 0
  refType: number = RulesType.COMMON
  refRules?: string = ''
  storyId?: number
  pass?: boolean
}

export enum StoryRecordStatus {
  NOT_ACTIVE = 0,
  ACTIVE,
  PASS_ALL,
}
export interface StoryRecordQuery {
  recordStatus?: number
}

export interface StoryRecordLevelPassForm {
  id: number
  levelId: number
  storyTitle: string
}

export interface StoryRecordItem {
  id?: number
  storyId?: number
  title: string
  content: string
  costAmount: number
  status: number
  levelId: number
  levels?: StoryLevelItem[]
}
