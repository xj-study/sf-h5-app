import { type TagItem, TagType } from '@/components/typing'
import { QuesWordFillLevelType, QuesWordType } from '@/pages/ques/typing'

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

export const EngWordQuesTypes: TagItem[] = [
  { tag: '选择', type: TagType.BLUE, value: QuesWordType.SELECT },
  { tag: '音频选择', type: TagType.BLUE, value: QuesWordType.SELECT_VIDEO },
  { tag: '填空', type: TagType.BLUE, value: QuesWordType.FILL },
  { tag: '音频填空', type: TagType.BLUE, value: QuesWordType.FILL_VIDEO },
]

export const EngWordQuesFillLevels: TagItem[] = [
  { tag: '简单', type: TagType.BLUE, value: QuesWordFillLevelType.SIMPLE },
  { tag: '中等', type: TagType.GOLD, value: QuesWordFillLevelType.MIDDLE },
  { tag: '极难', type: TagType.RED, value: QuesWordFillLevelType.DIFFCULTY },

]

export interface RulesGamePoint24 {
  count: number
}

export interface RulesLearnEng {
  level: number
  num: number
  quesType: number
  selectNum?: number
  fillLevel?: number
}

export function initLearnEngWord(): RulesLearnEng {
  return {
    level: 0,
    num: 4,
    quesType: QuesWordType.SELECT,
    selectNum: 4,
    fillLevel: QuesWordFillLevelType.SIMPLE,
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
