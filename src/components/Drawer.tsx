import component from "../component"
import Box, { BoxProps } from "./Box"

export interface DrawerProps extends BoxProps {
    onClose: () => void
}

export default function Drawer({ children, onClose, ...props }: DrawerProps) {
    const $ = component(undefined, "Drawer")
    return (
        <div class={$()}>
            <div class={$("handle")} onClick={onClose}></div>
            <Box {...props}>{children}</Box>
        </div>
    )
}
