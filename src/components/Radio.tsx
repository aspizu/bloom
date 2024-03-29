import { HTMLProps } from "preact/compat"
import component from "../component"

export interface RadioProps extends HTMLProps<HTMLDivElement> {
    class?: string
    active?: boolean
    disabled?: boolean
    onChange?: () => void
}

export function Radio({
    class: className,
    active = false,
    disabled = false,
    onChange,
    ...props
}: RadioProps) {
    const $ = component(className, "Radio", { active, disabled })
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
            <div class={$("inner")}></div>
        </div>
    )
}
