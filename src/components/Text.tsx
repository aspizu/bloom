import { HTMLProps } from "preact/compat"
import component from "../component"

export interface TextProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
    class?: string
    color?: "gray" | "dark-gray"
    size?: "xs" | "sm" | "lg" | "xl"
    bold?: boolean
    strikethrough?: boolean
}

export function Text({
    class: className,
    color,
    size,
    bold,
    strikethrough,
    ...props
}: TextProps) {
    const $ = component(className, "Text", color, size, { bold, strikethrough })
    return (
        <span class={$()} {...props}>
            {props.children}
        </span>
    )
}
