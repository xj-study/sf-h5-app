import { LEVEL_MAX, LEVEL_UP_SCORE } from './config'

export default class ScorePanel {
  private _score: number
  private _level: Ref<number> = ref(1)
  constructor(score: number = 0, level: number = 1) {
    this.score = score
    this.level = level
  }

  get score() {
    return this._score
  }

  set score(value) {
    if (this.score === value)
      return
    this._score = value
  }

  get level() {
    return this._level.value
  }

  set level(value) {
    if (this.level === value)
      return
    if (value > LEVEL_MAX)
      value = LEVEL_MAX
    this._level.value = value
  }

  reset() {
    this.score = 0
    this.level = 1
  }

  increaseScore(value) {
    this.score = value + this.score
    this.level = Math.floor(this.score / LEVEL_UP_SCORE) + 1
  }
}
