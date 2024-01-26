import { HTMLProps, forwardRef } from "preact/compat"
import { MutableRef, useImperativeHandle, useRef } from "preact/hooks"
import component from "../component"

export interface PaletteButtonProps extends HTMLProps<HTMLButtonElement> {
    class?: string
    color?: string
    active?: boolean
}

export function PaletteButton({
    class: className,
    color,
    active,
    ...props
}: PaletteButtonProps) {
    const $ = component(className, "PaletteButton", { active })

    return (
        <button
            {...props}
            style={{
                background: color,
            }}
            class={$()}
        />
    )
}

export interface PaletteInputProps {
    class?: string
    active?: boolean
    onInput?: (color: string) => void
}

function paletteInputHandle(inputRef: MutableRef<HTMLInputElement | null>) {
    return () => ({
        scrollIntoView() {
            inputRef.current?.scrollIntoView()
        },
        click() {
            inputRef.current?.click()
        },
        get value() {
            return inputRef.current?.value
        },
    })
}

export type PaletteInputHandle = ReturnType<
    ReturnType<typeof paletteInputHandle>
>

export const PaletteInput = forwardRef<PaletteInputHandle, PaletteInputProps>(
    ({ class: className, active, onInput }, ref) => {
        const divRef = useRef<HTMLDivElement | null>(null)
        const inputRef = useRef<HTMLInputElement | null>(null)
        const $ = component(className, "PaletteInput", { active })
        useImperativeHandle(ref, paletteInputHandle(inputRef))
        return (
            <div
                class={$()}
                onClick={() => {
                    if (!inputRef.current) return
                    if (divRef.current) {
                        divRef.current.style.background = inputRef.current.value
                    }
                    inputRef.current.click()
                    onInput?.(inputRef.current.value)
                }}
            >
                <div
                    ref={divRef}
                    class={$("color")}
                    style={{ background: inputRef.current?.value || "#000000" }}
                />
                <input
                    ref={inputRef}
                    class={$("input")}
                    type="color"
                    onInput={(ev) => {
                        const value = (ev.target as HTMLInputElement).value
                        if (divRef.current) {
                            divRef.current.style.background = value
                        }
                        onInput?.(value)
                    }}
                />
            </div>
        )
    }
)
