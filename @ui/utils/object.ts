export function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return Object.assign(
    {},
    // eslint-disable-next-line array-callback-return
    ...keys.map((key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key))
        return { [key]: object[key] }
    }),
  )
}

export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  keys.forEach(key => delete obj[key])
  return obj
}

export function get (object: Record<string, any>, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map(key => {
      const numKey = Number(key)
      return isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}