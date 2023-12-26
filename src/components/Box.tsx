import { ComponentChildren } from "preact"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface BoxProps extends HTMLProps<HTMLDivElement> {
  class?: string
  children?: ComponentChildren
  column?: boolean
  padding?: 1 | 2 | 3 | 4
  gap?: 1 | 2 | 3 | 4
  vcenter?: boolean
  hcenter?: boolean
  surface?: "card" | "card2"
}

export default function Box(props: BoxProps) {
  const {
    class: className,
    children,
    column,
    padding,
    gap,
    vcenter,
    hcenter,
    surface,
  } = props
  const $ = component(
    className,
    "Box",
    padding && `padding-${padding}`,
    gap && `gap-${gap}`,
    surface,
    { column, vcenter, hcenter }
  )
  return (
    <div {...props} class={$()}>
      {children}
    </div>
  )
}
