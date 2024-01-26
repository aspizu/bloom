import { HTMLProps } from "preact/compat"
import component from "../component"

export interface SkeletonProps extends HTMLProps<HTMLDivElement> {
    class?: string
    variant?: "text" | "input"
    width?: 1 | 2 | 3 | 4
}

export function Skeleton({
    class: className,
    variant,
    width,
    ...props
}: SkeletonProps) {
    const $ = component(
        className,
        "Skeleton",
        variant,
        width && `width-${width}`
    )
    return <div {...props} class={$()} />
}
