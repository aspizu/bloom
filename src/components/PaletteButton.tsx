import { HTMLProps } from "preact/compat"
import component from "../component"

export interface PaletteButtonProps extends HTMLProps<HTMLButtonElement> {
    class?: string
    color?: string
    active?: boolean
}

export default function PaletteButton({
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
