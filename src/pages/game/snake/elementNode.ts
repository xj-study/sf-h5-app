import type { Reactive } from 'vue'
import { NODE_SIZE } from './config'

import Size from './size'
import { addPx } from './utils'
import Position from './position'

export default class ElementNode {
  size: Reactive<Size> = reactive(new Size(NODE_SIZE, NODE_SIZE))
  protected position: Reactive<Position> = reactive(new Position())

  get x() {
    return this.position.x
  }

  set x(value) {
    this.position.x = value
  }

  get y() {
    return this.position.y
  }

  set y(value) {
    this.position.y = value
  }

  get style() {
    return {
      width: addPx(this.size.width),
      height: addPx(this.size.height),
      top: addPx(this.y),
      left: addPx(this.x),
    }
  }

  public clone() {
    const node = new ElementNode()
    node.x = this.x
    node.y = this.y
    return node
  }

  public equalPostion(node: ElementNode) {
    if (!node)
      return false
    return node.x === this.x && node.y === this.y
  }
}
