import { Signal, useSignal } from "@preact/signals"
import { ComponentChild, ComponentChildren } from "preact"
import { CSSProperties } from "preact/compat"
import { useRef, useState } from "preact/hooks"

export interface ViewTransitionProps {
    class?: string
    children?: ComponentChild
    startTransition: Signal<boolean>
    inClass?: string
    outClass?: string
    inStyle?: CSSProperties
    outStyle?: CSSProperties
    inline?: boolean
}

export function ViewTransition({
    class: className,
    children,
    startTransition,
    inClass,
    outClass,
    inStyle,
    outStyle,
    inline = false,
}: ViewTransitionProps) {
    const old = useSignal<ComponentChild | null>(null)
    if (startTransition.value) {
        const ret = (
            <div
                class={className}
                style={{
                    display: inline ? "inline-grid" : "grid",
                }}
                onAnimationEnd={() => {
                    startTransition.value = false
                    old.value = children
                }}
            >
                <div
                    class={outClass}
                    style={{ ...outStyle, gridArea: "1 / 1" }}
                >
                    {old.value}
                </div>
                <div class={inClass} style={{ ...inStyle, gridArea: "1 / 1" }}>
                    {children}
                </div>
            </div>
        )
        return ret
    }
    old.value = children
    return (
        <div class={className} style={{ display: "grid" }}>
            <div style={{ gridArea: "1 / 1" }}>{children}</div>
        </div>
    )
}

export interface AutoViewTransitionProps {
    class?: string
    children?: ComponentChild
    inClass?: string
    outClass?: string
    inStyle?: CSSProperties
    outStyle?: CSSProperties
    inline?: boolean
    transitionFromNull?: boolean
}

export interface OptionTransitionProps {
    children?: ComponentChild
    inClass?: string
    outClass?: string
    inline?: boolean
}

export function Transition({
    children,
    show,
    inClass,
    outClass,
    inline = false,
}: {
    children: ComponentChildren
    show: unknown
    inClass: string
    outClass: string
    inline?: boolean
}) {
    const [state, setState] = useState(0)
    if (state === 0 && show) {
        setState(1)
    }
    if (state !== 0 && !show) {
        setState(2)
    }
    return state === 0 ? null : (
        <div
            style={{ display: inline ? "inline-grid" : "grid" }}
            class={state === 1 ? inClass : outClass}
            onAnimationEnd={() => {
                if (state !== 1) {
                    setState(0)
                }
            }}
        >
            {children}
        </div>
    )
}

export function OptionTransition({
    children,
    inClass,
    outClass,
    inline = false,
}: {
    children: ComponentChild
    inClass?: string
    outClass?: string
    inline?: boolean
}) {
    const node = useRef(children)
    const [state, setState] = useState(true)
    const [_, setAux] = useState({})
    if (!node.current && children) {
        setState(true)
    }
    if (node.current && !children) {
        setState(false)
    }
    if (children) {
        node.current = children
    }
    return node.current ? (
        <div
            style={{
                display: inline ? "inline-grid" : "grid",
            }}
            class={state ? inClass : outClass}
            onAnimationEnd={() => {
                node.current = null
                setAux({})
            }}
        >
            {node.current}
        </div>
    ) : null
}

export function AutoViewTransition({
    class: className,
    children,
    inClass,
    outClass,
    inStyle,
    outStyle,
    inline = false,
    transitionFromNull = false,
}: AutoViewTransitionProps) {
    const startTransition = useSignal(false)
    const old = useSignal<ComponentChild | null>(null)
    if (
        transitionFromNull ? !!old.value !== !!children : old.value !== children
    ) {
        startTransition.value = true
    }
    if (startTransition.value) {
        const ret = (
            <div
                class={className}
                style={{
                    display: inline ? "inline-grid" : "grid",
                }}
                onAnimationEnd={() => {
                    startTransition.value = false
                    old.value = children
                }}
            >
                <div
                    class={outClass}
                    style={{ ...outStyle, gridArea: "1 / 1" }}
                >
                    {old.value}
                </div>
                <div class={inClass} style={{ ...inStyle, gridArea: "1 / 1" }}>
                    {children}
                </div>
            </div>
        )
        return ret
    }
    old.value = children
    if (!children) {
        return null
    }
    return (
        <div class={className} style={{ display: "grid" }}>
            <div style={{ gridArea: "1 / 1" }}>{children}</div>
        </div>
    )
}
