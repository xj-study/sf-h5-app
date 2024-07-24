export interface TabItem {
  title: string
  value: number
}

export enum TagType {
  GRAY = 1,
  GREEN = 2,
  RED = 3,
  BLUE = 4,
  GOLD = 5,
}

export interface TagItem {
  tag: string | number
  type: TagType
  value?: number
  select?: boolean
}

export function getTagValue(index, item: TagItem) {
  let value = index
  if (item.value !== undefined && item.value !== null)
    value = item.value
  return value
}
