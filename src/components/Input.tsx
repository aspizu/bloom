import { HTMLProps } from "preact/compat"
import component from "../component"

export interface InputProps extends HTMLProps<HTMLInputElement> {
  class?: string
}

export default function Input(props: InputProps) {
  const { class: className, children } = props
  const $ = component(className, "Input")
  return (
    <div class={$()}>
      <input {...props} class={$("input")} type="text" />
      {children}
    </div>
  )
}