import { useSignal } from "@preact/signals"
import { createPortal } from "preact/compat"
import { Transition } from "./ViewTransition"
import { Button, Col, Row, Switch } from "./components"

const modals = document.getElementById("modals")!

export default function App() {
    const state = useSignal(false)
    return (
        <Col padding={4} gap={4}>
            <Switch active={state} />
            <div style={{ height: "1600px", background: "red" }} />
            {createPortal(
                <Transition
                    show={state.value}
                    inClass="fade-in"
                    outClass="fade-out"
                >
                    <Row surface="card" padding={4} gap={4}>
                        <Button>Hello World!</Button>
                        <Button
                            variant="accent"
                            onClick={() => {
                                state.value = !state.value
                            }}
                        >
                            Hello World!
                        </Button>
                    </Row>
                </Transition>,
                modals
            )}
        </Col>
    )
}
