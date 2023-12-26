import { HTMLProps } from "preact/compat"
import component from "../component"

interface SeparatorProps extends HTMLProps<HTMLHRElement> {
  class?: string
}

export default function Separator(props: SeparatorProps) {
  const { class: className } = props
  const $ = component(className, "Separator")
  return <hr {...props} class={$()} />
}
