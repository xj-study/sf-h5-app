// ×”和“÷”
export enum OpeType {
  ADD = '+',
  SUB = '-',
  MUL = '×',
  DIV = '÷',
}

export const OpeTypeValue = {
  [OpeType.ADD]: 1,
  [OpeType.SUB]: 1,
  [OpeType.MUL]: 10,
  [OpeType.DIV]: 10,
}

export const RESULT = 24

export class Fraction {
  constructor(public numerator: number, public denominator: number) {
  }

  get value() {
    if (this.numerator % this.denominator === 0) {
      return this.numerator / this.denominator
    }
    return this
  }
}

type Num = number | Fraction

export interface INumData {
  num: Num
  select: boolean
  disabed: boolean

}

export class NumData implements INumData {
  static ID: number = 1

  _id: number

  constructor(public num: Num, public select: boolean = false, public disabed: boolean = false) {
    this._id = NumData.ID++
  }

  get id() {
    return this._id
  }

  get valueFrac() {
    if (typeof this.num === 'number')
      return new Fraction(this.num, 1)
    return this.num
  }

  private add(value: Fraction) {
    const self = this.valueFrac
    return new Fraction(
      self.numerator * value.denominator + self.denominator * value.numerator,
      self.denominator * value.denominator,
    )
  }

  private sub(value: Fraction) {
    const self = this.valueFrac
    return new Fraction(
      self.numerator * value.denominator - self.denominator * value.numerator,
      self.denominator * value.denominator,
    )
  }

  private mul(value: Fraction) {
    const self = this.valueFrac
    return new Fraction(
      self.numerator * value.numerator,
      self.denominator * value.denominator,
    )
  }

  private div(value: Fraction) {
    const self = this.valueFrac
    return new Fraction(
      self.numerator * value.denominator,
      self.denominator * value.numerator,
    )
  }

  calcFrac(value: NumData, opeType: OpeType) {
    let result: Num = 0
    switch (opeType) {
      case OpeType.ADD:
        result = this.add(value.valueFrac)
        break
      case OpeType.SUB:
        result = this.sub(value.valueFrac)
        break
      case OpeType.MUL:
        result = this.mul(value.valueFrac)
        break
      case OpeType.DIV:
        result = this.div(value.valueFrac)
        break
    }
    return new NumData(result.value)
  }

  calc(value: INumData, opeType: OpeType) {
    if (value.num instanceof Fraction || this.num instanceof Fraction) {
      return this.calcFrac(value as NumData, opeType)
    }
    let result: Num = 0
    switch (opeType) {
      case OpeType.ADD:
        result = this.num + value.num
        break
      case OpeType.SUB:
        result = this.num - value.num
        break
      case OpeType.MUL:
        result = this.num * value.num
        break
      case OpeType.DIV:
        result = new Fraction(this.num, value.num)
        if (typeof result.value === 'number') {
          result = result.value
        }
        break
    }
    return new NumData(result)
  }
}

export interface IExpression {
  num1: NumData
  num2: NumData
  opeType: OpeType
  refId?: number
}

export class Expression implements IExpression {
  constructor(public num1: NumData, public num2: NumData, public opeType: OpeType, public refId?: number) {}

  get value() {
    return `${this.num1?.num + this.opeType.valueOf() + this.num2?.num + [this.refId]}[${this.refId}]`
  }
}
