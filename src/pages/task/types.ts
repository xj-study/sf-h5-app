export enum TaskListType {
  USER = 0, // 用户类型
  MANAGER = 1, // 管理类型，家长去审核孩子的任务
}

export class TaskForm {
  constructor(public title: string = '', public content: string = '', public taskId?: number, public verifyFlag?: boolean) {}
}
