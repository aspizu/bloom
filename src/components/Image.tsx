import { HTMLProps } from "preact/compat"
import component from "../component"

export interface ImageProps extends HTMLProps<HTMLImageElement> {
    class?: string
}

export function Image({ class: className, ...props }: ImageProps) {
    const $ = component(className, "Image")
    return <img {...props} class={$()} />
}
