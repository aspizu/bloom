import { HTMLProps } from "preact/compat"
import component from "../component"

export interface BadgeProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
    class?: string
    variant?: "link" | "accent" | "inverted"
    iconLeft?: boolean
    iconRight?: boolean
    size?: "sm"
    button?: boolean
}

export function Badge({
    class: className,
    children,
    variant,
    iconLeft,
    iconRight,
    size,
    button,
    ...props
}: BadgeProps) {
    const $ = component(className, "Badge", variant, size, {
        iconLeft,
        iconRight,
        button,
    })
    return (
        <span {...props} class={$()}>
            {children}
        </span>
    )
}
