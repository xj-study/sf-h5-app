export class GiftForm {
  constructor(public name: string = '', public content: string = '', public price: number = 0, public id?: number) {}
}

export class OrderGiftForm extends GiftForm {
  num: number
  mark?: string
  constructor(name: string = '', content: string = '', price: number = 0, num: number = 1, id?: number, mark?: string) {
    super(name, content, price, id)
    this.num = num
    this.mark = mark
  }
}
