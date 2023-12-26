import { ComponentChildren } from "preact"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  class?: string
  children?: ComponentChildren
}

export default function Link(props: LinkProps) {
  const { class: className, children } = props
  const $ = component(className, "Link")
  return (
    <a {...props} class={$()}>
      {children}
    </a>
  )
}
