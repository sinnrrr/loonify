import React, { Component, useEffect } from "react"
import { Flex, Heading, HStack, Text } from "@chakra-ui/layout"
import { Button, IconButton } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { usePanelStore } from "app/core/stores/panel"
import { Slide } from "@chakra-ui/transition"
import { Input } from "@chakra-ui/input"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import SearchComponent from "./SearchComponent"
import HelloComponent from "./HelloComponent"
import { useBreakpointValue } from "@chakra-ui/media-query"

export const Main = () => {
  return (
    <>
      <Heading>Main</Heading>
    </>
  )
}

const MapPanel = () => {
  const {
    children,
    setChildren,
    isOpen,
    setOpen,
    setClose,
    searchQuery,
    setSearchQuery,
  } = usePanelStore()

  if (!children) setChildren(<HelloComponent />)

  const openOnInit = useBreakpointValue({ base: false, sm: true })

  useEffect(() => {
    if (openOnInit) setOpen()
  }, [openOnInit, setOpen])

  useEffect(() => {
    setChildren(searchQuery ? <SearchComponent /> : <HelloComponent />)
  }, [searchQuery, setChildren])

  return (
    <>
      <Button
        d="flex"
        flexDirection="column"
        m={theme.space[4]}
        boxShadow={theme.shadows["2xl"]}
        aria-label="Menu button"
        onClick={setOpen}
        zIndex={theme.zIndices.docked}
      >
        <HamburgerIcon />
        <Text fontSize={theme.fontSizes.sm}>Menu</Text>
      </Button>
      <Slide
        in={isOpen}
        direction="left"
        style={{ zIndex: theme.zIndices.docked, maxWidth: theme.sizes.xs }}
      >
        <Flex
          h="100vh"
          overflowY="auto"
          bgColor="white"
          direction="column"
          boxShadow={theme.shadows["2xl"]}
          zIndex={theme.zIndices.docked}
        >
          <HStack
            p={theme.space[4]}
            borderBottom={theme.borders["1px"]}
            borderColor={theme.colors.gray[200]}
          >
            <Input placeholder="Search here" onChange={(e) => setSearchQuery(e.target.value)} />
            <IconButton onClick={setClose} icon={<CloseIcon />} aria-label="Close menu button" />
          </HStack>
          <Flex direction="column" p={theme.space[4]}>
            {children}
          </Flex>
        </Flex>
      </Slide>
    </>
  )
}

export default MapPanel
