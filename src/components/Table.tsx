import { HTMLProps } from "preact/compat"
import component from "../component"

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]

export interface TableProps<T> extends Omit<HTMLProps<HTMLDivElement>, "data"> {
    class?: string
    children?: undefined
    data: T[]
    columns: {
        [key in keyof T]?: {
            title?: string
        }
    }
}

export default function Table<T>({
    class: className,
    data,
    columns,
    ...props
}: TableProps<T>) {
    const $ = component(className, "Table")
    return (
        <div
            {...props}
            class={$()}
            style={{
                gridTemplateColumns: `${(
                    Object.entries(columns) as Entries<typeof columns>
                )
                    .map(([_columnName, _column]) => {
                        return "1fr 0.2rem"
                    })
                    .join(" ")}`,
            }}
        >
            {(Object.entries(columns) as Entries<typeof columns>).map(
                ([columnName, column], i) => (
                    <>
                        <button class={$("column")}>
                            {column?.title ?? String(columnName)}
                        </button>
                        <button
                            class={$("handle")}
                            style={{
                                gridColumn: 2 + i * 2,
                                gridRowStart: 1,
                                gridRowEnd: `span ${1 + data.length}`,
                            }}
                        />
                    </>
                )
            )}
            {data.map((row) =>
                (Object.entries(columns) as Entries<typeof columns>).map(
                    ([columnName, _column], i) => (
                        <div
                            class={$("cell")}
                            style={{
                                gridColumn: 1 + i * 2,
                            }}
                        >
                            {String(row[columnName])}
                        </div>
                    )
                )
            )}
        </div>
    )
}
