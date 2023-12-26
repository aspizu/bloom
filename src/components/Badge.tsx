import { HTMLProps } from "preact/compat"
import component from "../component"

export interface BadgeProps extends HTMLProps<HTMLSpanElement> {
  class?: string
  variant?: "link" | "accent"
  iconLeft?: boolean
  iconRight?: boolean
}

export default function Badge(props: BadgeProps) {
  const { class: className, children, variant, iconLeft, iconRight } = props
  const $ = component(className, "Badge", variant, {
    iconLeft,
    iconRight,
  })
  return (
    <span {...props} class={$()}>
      {children}
    </span>
  )
}
