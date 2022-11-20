export const debounce = (fc: any, ms = 300) => {
  let timer: any
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fc.apply(null, args)
    }, ms)
  }
}
