import React from "react"
import { Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { usePanelStore } from "../stores/panel"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@chakra-ui/modal"
import Link from "next/link"
import theme from "@chakra-ui/theme"

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
      <Button zIndex={theme.zIndices.docked} colorScheme="blue" onClick={panel.setOpen}>
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
            <Link href="posts">Create post</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MapPanel
