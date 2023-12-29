type IntoIter<T> = Iterable<T> | Iterator<T>

export class Iter<T> {
    private iter: Iterator<T>

    constructor(iterable: Iterator<T>) {
        this.iter = iterable
    }

    [Symbol.iterator]() {
        return this
    }

    next() {
        return this.iter.next()
    }

    chain(...iterables: IntoIter<T>[]) {
        const that = this
        return iter(
            (function* () {
                yield* that
                for (const iterable of iterables) {
                    yield* iter(iterable)
                }
            })()
        )
    }

    map<U>(func: (item: T) => U): Iter<U> {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    yield func(item)
                }
            })()
        )
    }

    flatMap<U>(func: (item: T) => IntoIter<U>) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    for (const sub of iter(func(item))) {
                        yield sub
                    }
                }
            })()
        )
    }

    filter(func: (item: T) => boolean): Iter<T> {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    if (func(item)) {
                        yield item
                    }
                }
            })()
        )
    }

    reduce(func: (acc: T, cur: T) => T, initial: T) {
        let acc = initial
        for (const item of this) {
            acc = func(acc, item)
        }
        return acc
    }

    stepBy(step: number) {
        const that = this
        return iter(
            (function* () {
                while (true) {
                    const next = that.next()
                    if (next.done) {
                        return
                    }
                    yield next.value
                    for (let i = 0; i < step - 1; i++) {
                        const next = that.next()
                        if (next.done) {
                            return
                        }
                    }
                }
            })()
        )
    }

    zip<U>(iterable: IntoIter<U>) {
        const leftIterator = this
        const rightIterator = iter(iterable)
        return iter(
            (function* () {
                while (true) {
                    const left = leftIterator.next()
                    const right = rightIterator.next()
                    if (left.done || right.done) {
                        return
                    }
                    yield [left.value, right.value] as const
                }
            })()
        )
    }

    intersperse(separator: T) {
        const that = this
        return iter(
            (function* () {
                const next = that.next()
                if (next.done) {
                    return
                }
                yield next.value
                for (const item of that) {
                    yield separator
                    yield item
                }
            })()
        )
    }

    filterMap<U>(func: (item: T) => U | undefined) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    const value = func(item)
                    if (value !== undefined) {
                        yield value
                    }
                }
            })()
        )
    }

    filterTrue<U>(this: Iter<U | false | null | undefined>): Iter<U> {
        return this.filterMap((item) => (item ? item : undefined))
    }

    enumerate(): Iter<readonly [number, T]> {
        const that = this
        return iter(
            (function* () {
                let i = 0
                for (const item of that) {
                    yield [i, item] as const
                    i++
                }
            })()
        )
    }

    skipWhile(func: (item: T) => boolean) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    if (!func(item)) {
                        yield item
                        break
                    }
                }
                yield* that
            })()
        )
    }

    takeWhile(func: (item: T) => boolean) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    if (!func(item)) {
                        return
                    }
                    yield item
                }
            })()
        )
    }

    take(n: number) {
        const that = this
        return iter(
            (function* () {
                let i = 0
                for (const item of that) {
                    yield item
                    i++
                    if (i === n) {
                        return
                    }
                }
            })()
        )
    }

    flatten<U>(this: Iter<IntoIter<U>>) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    yield* iter(item)
                }
            })()
        )
    }

    inspect(func: (item: T) => void) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    func(item)
                    yield item
                }
            })()
        )
    }

    nextChunk(n: number) {
        let chunk = []
        for (let i = 0; i < n; i++) {
            const next = this.next()
            if (next.done) {
                break
            }
            chunk.push(next.value)
        }
        return chunk
    }

    count() {
        let count = 0
        for (const _ of this) {
            count++
        }
        return count
    }

    last() {
        let last = undefined
        for (const item of this) {
            last = item
        }
        return last
    }

    advanceBy(n: number) {
        for (let i = 0; i < n; i++) {
            if (this.next().done) {
                return n - i
            }
        }
        return undefined
    }

    nth(n: number) {
        let i = 0
        for (const item of this) {
            if (i === n) {
                return item
            }
            i++
        }
        return undefined
    }

    forEach(func: (item: T) => void) {
        for (const item of this) {
            func(item)
        }
    }

    skip(n: number) {
        this.nth(n)
        return this
    }

    all(func: (item: T) => boolean) {
        for (const item of this) {
            if (!func(item)) {
                return false
            }
        }
        return true
    }

    any(func: (item: T) => boolean) {
        for (const item of this) {
            if (func(item)) {
                return true
            }
        }
        return false
    }

    find(func: (item: T) => boolean) {
        for (const item of this) {
            if (func(item)) {
                return item
            }
        }
        return undefined
    }

    position(func: (item: T) => boolean) {
        for (const [i, item] of this.enumerate()) {
            if (func(item)) {
                return i
            }
        }
        return undefined
    }

    join(this: Iter<string>) {
        return this.reduce((acc, cur) => acc + cur, "")
    }

    cycle() {
        const that = this
        return iter(
            (function* () {
                const saved = []
                for (const item of that) {
                    yield item
                    saved.push(item)
                }
                while (true) {
                    yield* saved
                }
            })()
        )
    }

    batched(n: number) {
        const that = this
        return iter(
            (function* () {
                while (true) {
                    const chunk = that.nextChunk(n)
                    if (chunk.length === 0) {
                        return
                    }
                    yield chunk
                }
            })()
        )
    }

    starmap<U extends unknown[], V>(
        this: Iter<U>,
        func: (...args: [...U]) => V
    ) {
        const that = this
        return iter(
            (function* () {
                for (const item of that) {
                    yield func(...item)
                }
            })()
        )
    }

    collect() {
        return [...this]
    }
}

export function iter<T>(iterable: IntoIter<T>): Iter<T>
export function iter<T, U>(iterable: IntoIter<T>, map: (item: T) => U): Iter<U>
export function iter<T, U>(
    iterable: IntoIter<T>,
    map: (item: T) => U,
    filter: (item: T) => boolean
): Iter<U>
export function iter<T, U>(
    iterable: IntoIter<T>,
    map?: (item: T) => U,
    filter?: (item: T) => boolean
): Iter<T> | Iter<U> {
    if (map !== undefined) {
        if (filter !== undefined) {
            return iter(iterable).filter(filter).map(map)
        } else {
            return iter(iterable).map(map)
        }
    }
    if (typeof iterable === "object" && "next" in iterable) {
        return new Iter(iterable)
    }
    return new Iter(iterable[Symbol.iterator]())
}

function* _range(start: number, stop: number, step: number) {
    for (let i = start; i < stop; i += step) {
        yield i
    }
}

export function range(stop: number): Iter<number>
export function range(start: number, stop: number): Iter<number>
export function range(start: number, stop: number, step: number): Iter<number>
export function range(a: number, b?: number, c?: number) {
    if (b === undefined) {
        if (c === undefined) {
            return iter(_range(0, a, 1))
        } else {
            throw new SyntaxError()
        }
    } else {
        if (c === undefined) {
            return iter(_range(a, b, 1))
        } else {
            return iter(_range(a, b, c))
        }
    }
}

export function repeat<T>(item: T, count?: number) {
    return count
        ? iter(
              (function* () {
                  for (let i = 0; i < count; i++) {
                      yield item
                  }
              })()
          )
        : iter(
              (function* () {
                  while (true) {
                      yield item
                  }
              })()
          )
}

export function count(start: number, step: number = 1) {
    return iter(
        (function* () {
            let i = start
            while (true) {
                yield i
                i += step
            }
        })()
    )
}
