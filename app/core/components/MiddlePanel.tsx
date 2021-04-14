import { FunctionComponent } from "react"
import { Heading, HStack } from "@chakra-ui/layout"
import { usePanelStore } from "../stores/panel"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { usePanelRedirect } from "../hooks/usePanelRedirect"

const MiddlePanel: FunctionComponent<{ heading: string }> = ({ heading }) => {
  const panelRedirect = usePanelRedirect()
  const { previousChildren } = usePanelStore()

  return (
    <HStack>
      {previousChildren && (
        <ArrowBackIcon
          cursor="pointer"
          w={10}
          h={10}
          onClick={() => panelRedirect(previousChildren)}
        />
      )}
      <Heading>{heading}</Heading>
    </HStack>
  )
}

export default MiddlePanel
