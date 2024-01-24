import { ComponentChildren } from "preact"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface ButtonProps
    extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
    class?: string
    children?: ComponentChildren
    variant?: "accent" | "overlay"
    size?: "sm"
    disabled?: boolean
    inverted?: boolean
}

export function IconButton({
    class: className,
    children,
    variant,
    size,
    disabled,
    inverted,
    ...props
}: ButtonProps) {
    const $ = component(className, "IconButton", variant, size, {
        disabled,
        inverted,
    })
    return (
        <button {...props} size={undefined} class={$()}>
            {children}
        </button>
    )
}
