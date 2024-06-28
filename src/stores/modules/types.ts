export enum UserType {
  INIT = 0,
  CHILD = 1,
  PARENT = 2,
}

export const EXCHANGE_RATIO = 100

export class LoginUser {
  constructor(public type: number = UserType.INIT, public integral: number = 0, public token: string = '', public userName: string = '', public exchangeRatio: number = EXCHANGE_RATIO) {
  }
}
