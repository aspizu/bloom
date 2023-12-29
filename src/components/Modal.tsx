import { VNode } from "preact"
import { HTMLProps, createPortal } from "preact/compat"
import component from "../component"

const modals = document.getElementById("modals")!

export function createModal(vnode: VNode<unknown>) {
    return createPortal(vnode, modals)
}

export interface ModalProps extends HTMLProps<HTMLDivElement> {
    class?: string
}

export default function Modal({
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
