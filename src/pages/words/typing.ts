import { TagType } from '@/components/typing'

export interface Word {
  id?: number
  level?: number
  zhValue: string
  enValue: string
}

export const WordLevels = [
  { tag: 1, type: TagType.GRAY },
  { tag: 2, type: TagType.GREEN },
  { tag: 3, type: TagType.BLUE },
  { tag: 4, type: TagType.GOLD },
  { tag: 5, type: TagType.RED },
]
