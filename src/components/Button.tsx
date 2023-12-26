import { HTMLProps } from "preact/compat"
import component from "../component"

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  class?: string
  variant?: "accent"
  disabled?: boolean
  /** Reduces padding to accommodate icons towards left. */
  iconLeft?: boolean
  /** Reduces padding to accommodate icons towards right. */
  iconRight?: boolean
}

export default function Button(props: ButtonProps) {
  const {
    class: className,
    children,
    variant,
    disabled,
    iconLeft,
    iconRight,
  } = props
  const $ = component(className, "Button", variant, {
    disabled,
    iconLeft,
    iconRight,
  })
  return (
    <button {...props} class={$()}>
      {children}
    </button>
  )
}
