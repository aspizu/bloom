import { HTMLProps } from "preact/compat"
import component from "../component"

export interface TextProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
    class?: string
    color?: "gray" | "dark-gray"
    size?: "xs" | "sm" | "lg" | "xl"
    bold?: boolean
}

export default function Text({
    class: className,
    color,
    size,
    bold,
    ...props
}: TextProps) {
    const $ = component(className, "Text", color, size, { bold })
    return (
        <span {...props} class={$()}>
            {props.children}
        </span>
    )
}
