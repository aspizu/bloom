import { HTMLProps } from "preact/compat"
import component from "../component"

export interface IconProps extends Omit<HTMLProps<HTMLDivElement>, "size"> {
    class?: string
    children: string
    color?: "accent" | "warn" | "gray" | "dark-gray" | "black"
    size?: "sm"
}

export default function Icon({
    class: className,
    children,
    color,
    size,
    ...props
}: IconProps) {
    const $ = component(className, "Icon", color, size)
    return (
        <div {...props} class={$()}>
            {children}
        </div>
    )
}
