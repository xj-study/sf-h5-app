import { type TagItem, TagType } from '@/components/typing'

/**
 * 类型
 */
export enum RulesType {
  // 普通
  COMMON = 0,
  // 游戏 - 24点
  GAME_POINT24 = 100,
  // 学习 - 单词打卡
  LEARN_ENG_WORD = 200,
}

export enum LearnEngWordQuesType {
  SELECT = 10,
  SELECT_VIDEO = 11,
  FILL = 20,
  FILL_VIDEO = 21,
}

export const EngWordQuesTypes: TagItem[] = [
  { tag: '选择', type: TagType.BLUE, value: LearnEngWordQuesType.SELECT },
  { tag: '音频选择', type: TagType.BLUE, value: LearnEngWordQuesType.SELECT_VIDEO },
  { tag: '填空', type: TagType.BLUE, value: LearnEngWordQuesType.FILL },
  { tag: '音频填空', type: TagType.BLUE, value: LearnEngWordQuesType.FILL_VIDEO },
]

export enum LearnEngWordFillLevel {
  // 简单
  SIMPLE = 1,
  // 中等
  MIDDLE = 2,
  // 极难
  DIFFCULTY = 3,
}

export const EngWordQuesFillLevels: TagItem[] = [
  { tag: '简单', type: TagType.GREEN, value: LearnEngWordFillLevel.SIMPLE },
  { tag: '中等', type: TagType.GREEN, value: LearnEngWordFillLevel.MIDDLE },
  { tag: '极难', type: TagType.GREEN, value: LearnEngWordFillLevel.DIFFCULTY },

]

export interface GamePoint24 {
  count: number
}

export interface LearnEngWord {
  level: number
  num: number
  quesType: number
  selectNum?: number
  fillLevel?: number
}

export function initLearnEngWord() {
  return {
    level: 0,
    num: 4,
    quesType: LearnEngWordQuesType.SELECT,
    selectNum: 4,
  }
}

export interface RuleOption {
  name: number
  label: string
}

export const RulesTypeOptions: RuleOption[] = [
  { name: RulesType.COMMON, label: '通用' },
  { name: RulesType.GAME_POINT24, label: '游戏-24点' },
  { name: RulesType.LEARN_ENG_WORD, label: '学习-单词打卡' },
]

export class RulesConf {
  constructor(public type: string = 'type', public rules: string = 'rules') {
  }
}
