import { HTMLProps } from "preact/compat"
import component from "../component"

export interface TextProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
  class?: string
  color?: "gray" | "dark-gray"
  size?: "xs" | "sm" | "lg" | "xl"
  bold?: boolean
}

export default function Text(props: TextProps) {
  const { class: className, color, size, bold } = props
  const $ = component(className, "Text", color, size, { bold })
  return (
    <span {...props} size={undefined} class={$()}>
      {props.children}
    </span>
  )
}
