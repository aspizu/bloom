import { iter } from "./itertools"

export type ModifiersObject = {
  [key: string]: boolean | null | undefined
}

function kebabize(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

function transformModifiersObject(o: ModifiersObject) {
  return iter(Object.entries(o)).filterMap(([key, value]) => {
    if (value) {
      return key
    }
  })
}

export default function component(
  className: string | undefined,
  componentName: string,
  ...componentModifiers: (ModifiersObject | string | false | null | undefined)[]
) {
  const componentModifiersClasses = iter(componentModifiers)
    .flatMap((modifier) =>
      typeof modifier === "object" && modifier !== null
        ? transformModifiersObject(modifier)
        : [modifier]
    )
    .filterTrue()
    .map((modifier) => `${kebabize(componentName)}--${kebabize(modifier)}`)
    .collect()
  const $ = (
    elementName?: string,
    ...elementModifiers: (ModifiersObject | string | false | null | undefined)[]
  ) => {
    if (!elementName) {
      return concat(
        kebabize(componentName),
        concat(
          iter(componentModifiersClasses).intersperse(" ").join(),
          className
        )
      )
    }
    const elementModifiersClasses = iter(elementModifiers)
      .flatMap((modifier) =>
        typeof modifier === "object" && modifier !== null
          ? transformModifiersObject(modifier)
          : [modifier]
      )
      .filterTrue()
      .map(
        (modifier) =>
          `${kebabize(componentName)}__${kebabize(elementName)}--${kebabize(
            modifier
          )}`
      )
    return concat(
      `${kebabize(componentName)}__${kebabize(elementName)}`,
      iter(componentModifiersClasses)
        .chain(elementModifiersClasses)
        .intersperse(" ")
        .join()
    )
  }
  return $
}

export function concat(classes1: string, classes2?: string) {
  if (classes2) {
    return `${classes1} ${classes2}`
  }
  return classes1
}
