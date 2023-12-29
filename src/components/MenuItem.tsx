import { HTMLProps } from "preact/compat"
import component from "../component"

export interface MenuItemProps extends HTMLProps<HTMLButtonElement> {
    class?: string
}

export default function MenuItem({
    class: className,
    children,
    ...props
}: MenuItemProps) {
    const $ = component(className, "MenuItem")
    return (
        <button {...props} class={$()}>
            {children}
        </button>
    )
}
