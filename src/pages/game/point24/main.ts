import { OpeType, OpeTypeValue, RESULT } from './typing'

interface Exp {
  str: string
  value: 0
}

interface Item {
  num: number
  exp?: Exp
  children?: Item[]
}
export default class Point24Main {
  // 数字
  private _nums: number[] = []
  private _answers: string[] = []

  get nums() {
    return this._nums
  }

  get answers() {
    return this._answers
  }

  get randomAnswers() {
    if (this.answers.length) {
      const radomIdx = Math.floor(Math.random() * this.answers.length)
      return this.answers[radomIdx]
    } else {
      return '无解'
    }
  }

  public create() {
    this._nums = this.createNum()

    this._answers = this.calcResult()
  }

  /**
   *
   * @param size 数字长度
   * @param range 数字大小范围
   */
  private createNum(size: number = 4, range: number[] = [1, 13]) {
    const result: number[] = []
    const [min, max] = range
    for (let i = 0; i < size; i++) {
      result[i] = Math.floor(Math.random() * (max - min + 1)) + min
    }
    return result
  }

  // 计算可能结果
  private calcResult() {
    function compose(list: number[]) {
      if (list.length === 2)
        return asmd(list[0], list[1])

      const result: Item[] = []
      for (let i = 0; i < list.length; i++) {
        const sublist = list.filter((val, idx) => idx !== i)
        result.push({ num: list[i], children: compose(sublist) })
      }
      return result
    }

    function getExp(num1, num2, opeType, exp: Exp | undefined, flag = false) {
      if (exp) {
        let newStr = ''
        let newValue = OpeTypeValue[opeType]
        if (flag) {
          if (exp.value < newValue) {
            newStr = `(${exp.str}) ${opeType} ${num2}`
          } else {
            newStr = `${exp.str} ${opeType} ${num2}`
          }
        } else {
          if (exp.value < newValue) {
            newValue = exp.value
            newStr = `${num1} ${opeType} (${exp.str})`
          } else {
            newStr = `${num1} ${opeType} ${exp.str}`
          }
        }
        return { str: newStr, value: newValue }
      } else {
        return { str: `${num1} ${opeType} ${num2}`, value: OpeTypeValue[opeType] }
      }
    }

    function asmd(num1: number, num2: number, exp?: Exp) {
      const result: Item[] = []
      result.push({ num: num1 + num2, exp: getExp(num1, num2, OpeType.ADD, exp) })
      result.push({ num: num1 - num2, exp: getExp(num1, num2, OpeType.SUB, exp) })
      result.push({ num: num2 - num1, exp: getExp(num2, num1, OpeType.SUB, exp, true) })
      result.push({ num: num1 * num2, exp: getExp(num1, num2, OpeType.MUL, exp) })
      num2 !== 0 && result.push({ num: num1 / num2, exp: getExp(num1, num2, OpeType.DIV, exp) })
      num1 !== 0 && result.push({ num: num2 / num1, exp: getExp(num2, num1, OpeType.DIV, exp, true) })
      return result
    }

    function calc(list: Item[], num: number | '' = ''): Item[] {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.children) {
          const list = calc(item.children, item.num)
          if (num) {
            //
            list.forEach((item) => {
              result.push(...asmd(num, item.num, item.exp))
            })
          } else {
            result.push(...list)
          }
        } else {
          if (num) {
            result.push(...asmd(num, item.num, item.exp))
          } else {
            result.push(item)
          }
        }
      }
      return result
    }

    let result = calc(compose(this._nums))
    result = result.filter(item => Math.abs(item.num - RESULT) < 0.000001)
    // 去重
    const map = new Map()
    for (let i = 0; i < result.length; i++) {
      map.set(result[i].exp, result)
    }
    const answers: string[] = [...map.keys()].map(exp => exp.str)
    return answers
  }
}
