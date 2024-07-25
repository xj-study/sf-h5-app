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

export class TaskForm {
  public taskId?: number
  public id?: number
  public rules?: string = ''
  constructor(public title: string = '', public content: string = '', public integral: number = 10, public taskType: TaskType = TaskType.COMMON, public verifyFlag: boolean = true) {}
}
