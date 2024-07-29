import { RulesType } from '../components/rules/typing'
import { type TagItem, TagType } from '@/components/typing'

export interface StoryItem {
  id?: number
  title: string
  content: string
  costAmount: number
  status: number
  type: number
}

export enum StoryStatusType {
  // 未发布
  NOT_PUBLISH = 0,
  // 已发布
  PUBLISHED = 1,
  // 已下架
  OFF_SHELF = 2,
}

export enum StoryType {
  // 复杂类型
  DETAIL = 0,
  // 简单类型
  SIMPLE = 1,
}

export const StoryTypeItems: TagItem[] = [
  { tag: '详情', type: TagType.BLUE, value: StoryType.DETAIL },
  { tag: '简单', type: TagType.BLUE, value: StoryType.SIMPLE },
]

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
  status?: number = 0
}

export enum StoryRecordStatus {
  NOT_ACTIVE = 0,
  ACTIVE,
  PASS_ALL,
}

export enum StoryLevelStatus {
  LOCK = 0,
  PASS,
  ACTIVE,
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
  type: number
}
