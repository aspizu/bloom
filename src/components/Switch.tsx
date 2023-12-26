import { Signal } from "@preact/signals"
import { HTMLProps } from "preact/compat"
import component from "../component"

export interface SwitchProps extends HTMLProps<HTMLDivElement> {
  class?: string
  active?: boolean | Signal<boolean>
  disabled?: boolean
  onChange?: () => void
}

export default function Switch(props: SwitchProps) {
  const { class: className, active = false, disabled = false, onChange } = props
  const $ = component(className, "Switch", {
    active: active instanceof Signal ? active.value : active,
    disabled,
  })
  return (
    <div
      {...props}
      onChange={undefined}
      class={$()}
      onMouseDown={(ev) => {
        ev.preventDefault()
      }}
      onClick={(ev) => {
        ev.preventDefault()
        if (disabled) {
          return
        }
        if (active instanceof Signal) {
          active.value = !active.value
        }
        onChange && onChange()
      }}
    >
      <div class={$("inner")}></div>
    </div>
  )
}
