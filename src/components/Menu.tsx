import { HTMLProps } from "preact/compat"
import component from "../component"

export interface MenuProps extends HTMLProps<HTMLDivElement> {
  class?: string
}

export default function Menu(props: MenuProps) {
  const { class: className, children } = props
  const $ = component(className, "Menu")
  return (
    <div {...props} class={$()}>
      {children}
    </div>
  )
}
