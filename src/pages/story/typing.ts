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

/**
 * 关卡类型
 */
export enum StoryLevelType {
  // 普通
  COMMON = 0,
  // 游戏 - 24点
  GAME_POINT24 = 100,
  // 学习 - 单词打卡
  LEARN_ENG_WORD = 200,
}

export const StoryLevelTypeOptions = [
  { name: StoryLevelType.COMMON, label: '通用' },
  { name: StoryLevelType.GAME_POINT24, label: '游戏-24点' },
  { name: StoryLevelType.LEARN_ENG_WORD, label: '学习-单词打卡' },
]

export class StoryLevelItem {
  id?: number
  levelOrder: number = 0
  title: string = ''
  content: string = ''
  prize: number = 0
  refType: number = StoryLevelType.COMMON
  refRules?: string = ''
  storyId?: number
}

export enum StoryRecordStatus {
  NOT_ACTIVE = 0,
  ACTIVE,
  PASS_ALL,
}
export interface StoryRecordQuery {
  recordStatus?: number
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
