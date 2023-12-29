import { HTMLProps } from "preact/compat"
import component from "../component"

export interface CheckboxProps extends HTMLProps<HTMLDivElement> {
    class?: string
    active?: boolean
    disabled?: boolean
    onChange?: () => void
}

export default function Checkbox({
    class: className,
    active = false,
    disabled = false,
    onChange,
    ...props
}: CheckboxProps) {
    const $ = component(className, "Checkbox", { active, disabled })
    return (
        <div
            {...props}
            class={$()}
            onMouseDown={(ev) => {
                ev.preventDefault()
            }}
            onClick={(ev) => {
                ev.preventDefault()
                !disabled && onChange && onChange()
            }}
        >
            <div class={$("inner")}>check</div>
        </div>
    )
}
