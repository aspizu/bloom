import { HTMLProps } from "preact/compat"
import component from "../component"

export interface InputProps extends HTMLProps<HTMLInputElement> {
    class?: string
}

export function Input({
    class: className,
    children,
    ...props
}: InputProps) {
    const $ = component(className, "Input")
    return (
        <div class={$()}>
            <input {...props} class={$("input")} type="text" />
            {children}
        </div>
    )
}
