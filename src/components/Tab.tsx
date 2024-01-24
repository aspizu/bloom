import { HTMLProps } from "preact/compat"
import component from "../component"

export interface TabProps extends HTMLProps<HTMLButtonElement> {
    class?: string
    active?: boolean
    /** Reduces padding towards left to accommodate icons. */
    iconLeft?: boolean
    /** Reduces padding towards right to accommodate icons. */
    iconRight?: boolean
}

export function Tab({
    class: className,
    children,
    active,
    iconLeft,
    iconRight,
    ...props
}: TabProps) {
    const $ = component(className, "Tab", { active, iconLeft, iconRight })
    return (
        <button {...props} class={$()}>
            {children}
        </button>
    )
}
