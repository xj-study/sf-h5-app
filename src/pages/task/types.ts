export enum TaskListType {
  USER = 0, // 用户类型
  MANAGER = 1, // 管理类型，家长去审核孩子的任务
}

export enum TaskStatus {
  INIT = 0,
  WATIT_VERIFY = 100,
  COMPLETE = 200,
}

export class TaskForm {
  constructor(public title: string = '', public content: string = '', public integral: number = 0, public taskId?: number, public verifyFlag?: boolean) {}
}
