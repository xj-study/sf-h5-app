import { QuesWordType } from './typing'

export function isQuesWordTypeSelect(type) {
  return [QuesWordType.SELECT, QuesWordType.SELECT_VIDEO].includes(type)
}
export function isQuesWordTypeVideo(type) {
  return [QuesWordType.SELECT_VIDEO, QuesWordType.FILL_VIDEO].includes(type)
}
