import { ComponentChildren } from "preact"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
    class?: string
    children?: ComponentChildren
}

export function Link({
    class: className,
    children,
    ...props
}: LinkProps) {
    const $ = component(className, "Link")
    return (
        <a {...props} class={$()}>
            {children}
        </a>
    )
}
