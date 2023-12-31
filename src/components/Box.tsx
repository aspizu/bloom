import { ComponentChildren } from "preact"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface BoxProps extends Omit<HTMLProps<HTMLDivElement>, "wrap"> {
    class?: string
    children?: ComponentChildren
    column?: boolean
    padding?: 1 | 2 | 3 | 4
    gap?: 1 | 2 | 3 | 4
    vcenter?: boolean
    hcenter?: boolean
    surface?: "card" | "card2" | "modal" | "warn" | "accent"
    wrap?: boolean
    wrapReverse?: boolean
}

export default function Box({
    class: className,
    children,
    column,
    padding,
    gap,
    vcenter,
    hcenter,
    surface,
    wrap,
    wrapReverse,
    ...props
}: BoxProps) {
    const $ = component(
        className,
        "Box",
        padding && `padding-${padding}`,
        gap && `gap-${gap}`,
        surface,
        { column, vcenter, hcenter, wrap, wrapReverse }
    )
    return (
        <div {...props} class={$()}>
            {children}
        </div>
    )
}
