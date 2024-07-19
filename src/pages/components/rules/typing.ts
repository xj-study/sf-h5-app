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

export const RulesTypeOptions = [
  { name: RulesType.COMMON, label: '通用' },
  { name: RulesType.GAME_POINT24, label: '游戏-24点' },
  { name: RulesType.LEARN_ENG_WORD, label: '学习-单词打卡' },
]

export class RulesConf {
  constructor(public type: string = 'type', public rules: string = 'rules') {
  }
}
