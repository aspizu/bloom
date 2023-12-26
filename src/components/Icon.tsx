import { HTMLProps } from "preact/compat"
import component from "../component"

export interface IconProps extends HTMLProps<HTMLDivElement> {
  class?: string
  children: string
}

export default function Icon(props: IconProps) {
  const { class: className, children } = props
  const $ = component(className, "Icon")
  return (
    <div {...props} class={$()}>
      {children}
    </div>
  )
}
