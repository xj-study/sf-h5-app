import { MAIN_PANEL_HEIGHT, MAIN_PANEL_WIDTH, NODE_SIZE, SNAKE_INIT_SIZE } from './config'
import ElementNode from './elementNode'
import { verifyInner } from './utils'

export default class Snake extends ElementNode {
  nodes: Ref<ElementNode[]> = ref()

  constructor() {
    super()

    this.init()
  }

  get head() {
    return this.nodes.value[0]
  }

  get x() {
    return this.head.x
  }

  set x(value) {
    if (this.x === value)
      return

    if (this.checkDirectionX(value)) {
      // 方向不对，继续之前的方向
      if (value > this.x) {
        value = this.x - NODE_SIZE
      } else {
        value = this.x + NODE_SIZE
      }
    }

    if (!verifyInner(0, MAIN_PANEL_WIDTH - NODE_SIZE, value))
      throw new Error('撞墙了')

    this.moveBody()
    this.head.x = value
    this.isHitBody()
  }

  get y() {
    return this.head.y
  }

  set y(value) {
    if (this.y === value)
      return

    if (this.checkDirectionY(value)) {
      // 方向不对，继续之前的方向
      if (value > this.y) {
        value = this.y - NODE_SIZE
      } else {
        value = this.y + NODE_SIZE
      }
    }

    if (!verifyInner(0, MAIN_PANEL_HEIGHT - NODE_SIZE, value))
      throw new Error('撞墙了')

    this.moveBody()
    this.head.y = value
    this.isHitBody()
  }

  private checkDirectionX(value): boolean {
    const secondNode = this.nodes.value[1]
    return secondNode.x === value
  }

  private checkDirectionY(value): boolean {
    const secondNode = this.nodes.value[1]
    return secondNode.y === value
  }

  private isHitBody() {
    const bodys = this.nodes.value
    for (let i = bodys.length - 1; i > 0; i--) {
      if (bodys[i].equalPostion(this.head)) {
        throw new Error('咬到自己了')
      }
    }
  }

  eat(size: number) {
    const lastNode = this.nodes.value[this.nodes.value.length - 1]
    for (let i = 0; i < size; i++) {
      this.nodes.value.push(lastNode.clone())
    }
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  private moveBody() {
    const bodys = this.nodes.value
    for (let i = bodys.length - 1; i > 0; i--) {
      bodys[i].x = bodys[i - 1].x
      bodys[i].y = bodys[i - 1].y
    }
  }

  reset() {
    this.init()
  }

  private init() {
    const bodys: ElementNode[] = []
    for (let i = 0; i < SNAKE_INIT_SIZE; i++) {
      bodys.push(new ElementNode())
    }
    this.nodes.value = bodys
  }
}
