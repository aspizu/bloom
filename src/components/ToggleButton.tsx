import { HTMLProps } from "preact/compat"
import component from "../component"

export interface ToggleButtonProps extends HTMLProps<HTMLButtonElement> {
    class?: string
    variant?: "accent"
    disabled?: boolean
    /** Reduces padding to accommodate icons towards left. */
    iconLeft?: boolean
    /** Reduces padding to accommodate icons towards right. */
    iconRight?: boolean
    active?: boolean
}

export default function ToggleButton(props: ToggleButtonProps) {
    const {
        class: className,
        children,
        variant,
        disabled,
        iconLeft,
        iconRight,
        active,
    } = props
    const $ = component(className, "ToggleButton", variant, {
        disabled,
        iconLeft,
        iconRight,
        active,
    })
    return (
        <button {...props} class={$()}>
            {children}
        </button>
    )
}
