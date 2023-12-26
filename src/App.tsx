import { useSignal } from "@preact/signals"
import Badge from "./components/Badge"
import Box from "./components/Box"
import Button from "./components/Button"
import Checkbox from "./components/Checkbox"
import Flexpander from "./components/Flexpander"
import Icon from "./components/Icon"
import IconButton from "./components/IconButton"
import Input from "./components/Input"
import Link from "./components/Link"
import Menu from "./components/Menu"
import MenuItem from "./components/MenuItem"
import Radio from "./components/Radio"
import Separator from "./components/Separator"
import Switch from "./components/Switch"
import Tab from "./components/Tab"
import Table from "./components/Table"
import Text from "./components/Text"
import ToggleButton from "./components/ToggleButton"

export default function App() {
  const checkbox = useSignal(false)
  const toggleSwitch = useSignal(false)
  const toggleBtn = useSignal(false)
  const radioIndex = useSignal(1)
  return (
    <Box padding={4} gap={4}>
      <Box column gap={4}>
        <h1>Button</h1>
        <Box gap={4}>
          <Button>Properties</Button>
          <Button disabled>Save</Button>
        </Box>
        <Box gap={4}>
          <ToggleButton
            active={toggleBtn.value}
            onClick={() => {
              toggleBtn.value = !toggleBtn.value
            }}
          >
            Repeat
          </ToggleButton>
          <ToggleButton
            variant="accent"
            active={toggleBtn.value}
            onClick={() => {
              toggleBtn.value = !toggleBtn.value
            }}
          >
            Repeat
          </ToggleButton>
        </Box>
        <Box gap={4}>
          <Button variant="accent">Download</Button>
          <Button variant="accent" disabled>
            Delete
          </Button>
        </Box>
        <Box gap={4}>
          <Button iconLeft variant="accent">
            <Icon>download</Icon> Download
          </Button>
          <Button iconRight variant="accent" disabled>
            Delete
            <Icon>delete</Icon>
          </Button>
        </Box>

        <h1>IconButton</h1>
        <Box gap={4}>
          <IconButton>download</IconButton>
          <IconButton variant="accent">download</IconButton>
          <IconButton variant="overlay">download</IconButton>
        </Box>
        <Box gap={4}>
          <IconButton disabled>download</IconButton>
          <IconButton disabled variant="accent">
            download
          </IconButton>
          <IconButton disabled variant="overlay">
            download
          </IconButton>
        </Box>
        <Box gap={4}>
          <IconButton size="sm">download</IconButton>
          <IconButton size="sm" variant="accent">
            download
          </IconButton>
          <IconButton size="sm" variant="overlay">
            close
          </IconButton>
        </Box>
        <Box gap={4}>
          <IconButton size="sm" disabled>
            download
          </IconButton>
          <IconButton size="sm" disabled variant="accent">
            download
          </IconButton>
          <IconButton size="sm" disabled variant="overlay">
            close
          </IconButton>
        </Box>

        <Text size="lg" bold>
          Badges
        </Text>

        <Box gap={4}>
          <Badge iconRight>
            Hello
            <IconButton variant="overlay" inverted size="sm">
              close
            </IconButton>
          </Badge>
          <Badge iconRight variant="accent">
            Hello
            <IconButton variant="overlay" size="sm">
              close
            </IconButton>
          </Badge>
          <Link>
            <Badge variant="link">Hello</Badge>
          </Link>
        </Box>

        <h1>Checkbox</h1>
        <Box gap={4}>
          <Checkbox
            active={checkbox.value}
            onChange={() => {
              checkbox.value = !checkbox.value
            }}
          />
          Interactive
        </Box>
        <Box gap={4}>
          <Checkbox active />
          Checked
        </Box>
        <Box gap={4}>
          <Checkbox disabled />
          Disabled
        </Box>
        <Box gap={4}>
          <Checkbox active disabled />
          Checked and disabled
        </Box>
      </Box>
      <Box column gap={4}>
        <h1>Switch</h1>
        <Box gap={4}>
          <Switch
            active={toggleSwitch.value}
            onChange={() => {
              toggleSwitch.value = !toggleSwitch.value
            }}
          />
          Interactive
        </Box>
        <Box gap={4}>
          <Switch active />
          On
        </Box>
        <Box gap={4}>
          <Switch disabled />
          Disabled
        </Box>
        <Box gap={4}>
          <Switch active disabled />
          On and disabled
        </Box>

        <h1>Link</h1>
        <Link href="https://github.com/aspizu">https://github.com/aspizu</Link>

        <h1>Radio</h1>

        <Box column gap={4}>
          <Box gap={4}>
            <Radio
              active={radioIndex.value === 1}
              onChange={() => {
                radioIndex.value = 1
              }}
            />
            Monday
          </Box>
          <Box gap={4}>
            <Radio
              active={radioIndex.value === 2}
              onChange={() => {
                radioIndex.value = 2
              }}
            />
            Tuesday
          </Box>
          <Box gap={4}>
            <Radio
              active={radioIndex.value === 3}
              onChange={() => {
                radioIndex.value = 3
              }}
            />
            Wednesday
          </Box>

          <Box gap={4}>
            <Radio disabled />
            Disabled
          </Box>
          <Box gap={4}>
            <Radio active disabled />
            Chosen and disabled
          </Box>
        </Box>

        <h1>Input</h1>
        <Input>
          <IconButton variant="overlay" size="sm">
            close
          </IconButton>
          <IconButton variant="overlay" size="sm">
            search
          </IconButton>
        </Input>

        <h1>Box</h1>

        <Box column gap={4} padding={4} surface="card">
          Hello world!
          <Separator />
          Bye
          <Box padding={4} surface="card2">
            Quote
          </Box>
        </Box>
      </Box>

      <Box column gap={4}>
        <Text size="xs" color="gray">
          Extra small text with color gray.
        </Text>
        <Text size="sm">Small text.</Text>
        <Text>Regular text.</Text>
        <Text size="lg">Large text.</Text>
        <Text size="xl">Extra large text.</Text>
        <Text color="dark-gray">Dark gray colored text.</Text>
        <Text bold>bold text.</Text>
        <Box column gap={2}>
          <Box gap={2}>
            <Tab active iconRight>
              Tab 1
              <IconButton variant="overlay" size="sm">
                close
              </IconButton>
            </Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Box>
          <Box>
            <Menu
              style={{
                maxHeight: "7rem",
                overflowY: "scroll",
              }}
            >
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
              <MenuItem>
                Menu
                <Flexpander />
                <Checkbox active />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Table
          data={[
            {
              Name: "John Smith",
              Age: 28,
              Email: "john.smith@email.com",
              Address: "123 Main St, City",
              Phone: "123-456-7890",
            },
            {
              Name: "Emily Davis",
              Age: 35,
              Email: "emily.davis@email.com",
              Address: "456 Elm St, Another City",
              Phone: "987-654-3210",
            },
            {
              Name: "Alex Johnson",
              Age: 42,
              Email: "alex.johnson@email.com",
              Address: "789 Oak St, Town",
              Phone: "555-123-4567",
            },
            {
              Name: "Sarah Brown",
              Age: 22,
              Email: "sarah.brown@email.com",
              Address: "101 Pine St, Village",
              Phone: "777-888-9999",
            },
            {
              Name: "Michael Lee",
              Age: 31,
              Email: "michael.lee@email.com",
              Address: "246 Maple St, Countryside",
              Phone: "333-444-5555",
            },
          ]}
          columns={{
            Name: {},
            Age: {},
            Email: {},
            Address: {},
            Phone: {},
          }}
        />
      </Box>
    </Box>
  )
}
