import { HTMLProps } from "preact/compat"
import component from "../component"

export interface ModalProps extends HTMLProps<HTMLDivElement> {
    class?: string
}

export function Modal({
    class: className,
    children,
    ...props
}: ModalProps) {
    const $ = component(className, "Modal")
    return (
        <div {...props} class={$()}>
            {children}
        </div>
    )
}
