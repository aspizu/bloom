import { Signal, useSignal } from "@preact/signals"
import { ComponentChild } from "preact"
import { CSSProperties } from "preact/compat"

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
    const old = useSignal(children)
    const state = useSignal(true)
    if (!old.value && children) {
        state.value = true
    }
    if (old.value && !children) {
        state.value = false
    }
    if (children) {
        old.value = children
    }
    return old.value ? (
        <div
            style={{
                display: inline ? "inline-grid" : "grid",
            }}
            class={state.value ? inClass : outClass}
            onAnimationEnd={() => {
                old.value = null
            }}
        >
            {old.value}
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
