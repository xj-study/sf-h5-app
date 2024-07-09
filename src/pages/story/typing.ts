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

export interface StoryLevelItem {
  id?: number
  title: string
  content: string
  prize: number
}

/**
 * 关卡类型
 */
export enum StoryLevelType {

}
