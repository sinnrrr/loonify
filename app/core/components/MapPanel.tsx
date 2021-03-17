import React from "react"
import theme from "@chakra-ui/theme"
import { Box, Heading, Stack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Fade } from "@chakra-ui/transition"
import { usePanelStore } from "../stores/panel"
import { Radio, RadioGroup } from "@chakra-ui/radio"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal"
import { useDisclosure } from "@chakra-ui/hooks"
import Link from "next/link"

export const Main = () => {
  return (
    <>
      <Heading>Main</Heading>
    </>
  )
}

const MapPanel = () => {
  const panel = usePanelStore()

  return (
    <>
      <Button colorScheme="blue" onClick={panel.setOpen}>
        Open
      </Button>
      <Drawer
        closeOnOverlayClick={false}
        placement="left"
        onClose={panel.setClose}
        isOpen={panel.isOpen}
      >
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <Link href="/create">Create post</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MapPanel
