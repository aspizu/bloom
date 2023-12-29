import { useSignal } from "@preact/signals"
import { OptionTransition } from "./ViewTransition"
import Badge from "./components/Badge"
import Box from "./components/Box"
import Button from "./components/Button"
import Drawer from "./components/Drawer"
import Flexpander from "./components/Flexpander"
import Image from "./components/Image"
import Modal, { createModal } from "./components/Modal"
import PaletteButton from "./components/PaletteButton"
import Text from "./components/Text"

const pastelColors: string[] = [
    "#FFD1DC", // Pastel Pink
    "#FFA07A", // Light Salmon
    "#FFB6C1", // Light Pink
    "#87CEEB", // Sky Blue
    "#98FB98", // Pale Green
    "#FFD700", // Light Yellow
    "#B19CD9", // Lavender
    "#FF6347", // Tomato
    "#FFB347", // Pastel Orange
    "#ADD8E6", // Light Blue
    // Add more pastel colors as needed
]

export default function App() {
    const selectedColor = useSignal<string | null>(null)
    const modalOpen = useSignal(false)
    function showModal() {
        modalOpen.value = true
    }
    function hideModal() {
        modalOpen.value = false
    }
    return (
        <Box column padding={4} gap={4}>
            <Text>Hello world!</Text>
            <Button variant="accent" onClick={showModal}>
                Hello
            </Button>
            <Box column surface="card" padding={4} gap={4}>
                <Box gap={2}>
                    <Badge size="sm">Hello</Badge>
                    <Badge size="sm" variant="inverted">
                        Hello
                    </Badge>
                </Box>
                <Box wrap gap={4}>
                    {pastelColors.map((color) => (
                        <PaletteButton
                            key={color}
                            color={color}
                            active={selectedColor.value === color}
                            onClick={() => {
                                selectedColor.value = color
                            }}
                        />
                    ))}
                </Box>
                <Box surface="warn" padding={4}>
                    <Text>
                        This is experimental and might be removed in future
                        versions
                    </Text>
                </Box>
                <Box surface="accent" padding={4}>
                    <Text>
                        This is experimental and might be removed in future
                        versions
                    </Text>
                </Box>
                <Image src="https://picsum.photos/800/600" />
            </Box>
            {createModal(
                <OptionTransition inClass="fade-in" outClass="fade-out">
                    {modalOpen.value && (
                        <Modal>
                            <Drawer
                                column
                                padding={4}
                                gap={4}
                                onClose={hideModal}
                            >
                                <Box vcenter gap={4}>
                                    <Text size="lg" bold>
                                        Hello world!
                                    </Text>
                                    <Flexpander />
                                </Box>
                                <Box gap={4}>
                                    <Button variant="accent">Delete</Button>
                                    <Button onClick={hideModal}>Cancel</Button>
                                </Box>
                            </Drawer>
                        </Modal>
                    )}
                </OptionTransition>
            )}
        </Box>
    )
}
