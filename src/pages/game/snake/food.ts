import { MAIN_PANEL_HEIGHT, MAIN_PANEL_WIDTH, NODE_SIZE } from './config'
import ElementNode from './elementNode'
import { random } from './utils'

export default class Food extends ElementNode {
  constructor() {
    super()
    this.change()
  }

  change() {
    this.x = random(MAIN_PANEL_WIDTH, NODE_SIZE)
    this.y = random(MAIN_PANEL_HEIGHT, NODE_SIZE)
  }
}
