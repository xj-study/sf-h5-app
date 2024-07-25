/**
 * 返回不重复指定个数的在 [min, max) 之间的随机整数
 * @param max
 * @param size
 * @returns
 */
export function randomNum(max: number, size: number = 1, min: number = 0): number[] {
  if (size === 1)
    return [Math.floor(Math.random() * max) + min]
  max = max - min
  let list = shuffle(max)
  if (min > 0)
    list = list.map(_ => _ + min)

  return list.slice(0, size)
}

export function shuffle(target: number[] | number) {
  let list: number[] = []
  if (typeof target === 'number') {
    for (let i = 0; i < target; i++) {
      list[i] = i
    }
  } else {
    list = target.slice()
  }

  let i = list.length
  while (i) {
    const j = Math.floor(Math.random() * i--)
    ;[list[j], list[i]] = [list[i], list[j]]
  }
  return list
}
