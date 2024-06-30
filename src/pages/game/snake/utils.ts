export function addPx(value: number): string {
  return `${value}px`
}

export function random(max: number, unit: number) {
  const count = Math.floor(max / unit)
  return Math.floor(Math.random() * count) * unit
}

export function verifyInner(min: number, max: number, value: number) {
  return value >= min && value <= max
}
