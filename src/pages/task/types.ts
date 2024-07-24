export enum TaskStatus {
  INIT = 0,
  WATIT_VERIFY = 100,
  COMPLETE = 200,
}

//
export enum TaskDateType {
  // 今天
  TODAY = 1,
  // 昨天
  YESTODAY = 2,
}

export enum TaskType {
  // 普通
  COMMON = 0,
  // 游戏 - 24点
  GAME_POINT24 = 100,
  // 学习 - 单词打卡
  LEARN_ENG_WORD = 200,
}

export const TaskTypeOptions = [
  { name: TaskType.COMMON, label: '通用' },
  { name: TaskType.GAME_POINT24, label: '游戏-24点' },
  { name: TaskType.LEARN_ENG_WORD, label: '学习-单词打卡' },
]

export class TaskForm {
  public taskId?: number
  public id?: number
  public rules?: string = ''
  constructor(public title: string = '', public content: string = '', public integral: number = 10, public taskType: TaskType = TaskType.COMMON, public verifyFlag: boolean = true) {}
}
