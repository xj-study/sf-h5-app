export enum UserType {
  INIT = 0,
  CHILD = 1,
  PARENT = 2,
}

export class LoginUser {
  constructor(public type: number = UserType.INIT, public token: string = '', public userName: string = '') {
  }
}
