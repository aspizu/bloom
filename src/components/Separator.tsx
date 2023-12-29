import { HTMLProps } from "preact/compat"
import component from "../component"

interface SeparatorProps extends HTMLProps<HTMLHRElement> {
    class?: string
}

export default function Separator({
    class: className,
    ...props
}: SeparatorProps) {
    const $ = component(className, "Separator")
    return <hr {...props} class={$()} />
}
