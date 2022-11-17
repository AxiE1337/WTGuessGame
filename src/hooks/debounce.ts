export const debounce = (delay: number) => {
  const debounce = (fc: any, ms = delay) => {
    !ms ? (ms = 100) : ms
    let timer: any
    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fc.apply(null, args)
      }, ms)
    }
  }
  return [debounce]
}
