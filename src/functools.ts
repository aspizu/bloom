export function cache<T, U>(func: (param: T) => U) {
  const memo = new Map<T, U>()
  return (param: T) => {
    let result = memo.get(param)
    if (result) {
      return result
    }
    result = func(param)
    memo.set(param, result)
    return result
  }
}

export function asyncCache<T, U>(func: (param: T) => Promise<U>) {
  const memo = new Map<T, U>()
  return async (param: T) => {
    let result = memo.get(param)
    if (result) {
      return result
    }
    result = await func(param)
    memo.set(param, result)
    return result
  }
}
