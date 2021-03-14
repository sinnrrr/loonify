import React from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import theme from "@chakra-ui/theme"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { Fade, ScaleFade, SlideFade } from "@chakra-ui/transition"
import { useDisclosure } from "@chakra-ui/hooks"
import { Skeleton } from "@chakra-ui/skeleton"

const Categories = () => {
  return (
    <>
      <Heading>Categories</Heading>
    </>
  )
}

const Search = () => {
  return (
    <>
      <Heading>Search</Heading>
    </>
  )
}

const MapPanel = () => {
  const { isOpen: panelIsOpen, onOpen: panelOnOpen, onToggle: panelOnToggle } = useDisclosure()
  const { isOpen: searchIsOpen, onOpen: searchOnOpen, onClose: searchOnClose } = useDisclosure()

  const PANEL_SHADOW = theme.shadows["2xl"]
  const PANEL_BORDER_RADIUS = theme.radii["2xl"]

  return (
    <Box zIndex={theme.zIndices.docked} p="4">
      <Box>
        <Box
          p={theme.space[4]}
          bgColor={theme.colors.white}
          transition={theme.transition.duration.normal}
          borderTopRadius={PANEL_BORDER_RADIUS}
          boxShadow={PANEL_SHADOW}
          borderBottomRadius={panelIsOpen ? theme.radii.none : PANEL_BORDER_RADIUS}
        >
          <InputGroup>
            <InputLeftElement>
              <IconButton
                size="sm"
                onClick={panelOnToggle}
                aria-label="Menu icon"
                icon={<HamburgerIcon />}
              />
            </InputLeftElement>
            <Input
              placeholder="Search"
              onFocus={() => {
                panelOnOpen()
                searchOnOpen()
              }}
              onBlur={(e) => {
                if (e.target.value.length === 0) searchOnClose()
              }}
              transition={theme.transition.duration.normal}
              boxShadow={panelIsOpen ? theme.shadows["md"] : theme.shadows.none}
            />
          </InputGroup>
        </Box>
        <ScaleFade in={panelIsOpen} unmountOnExit>
          <Flex
            direction="column"
            px={theme.space[4]}
            pb={theme.space[4]}
            borderBottomRadius={PANEL_BORDER_RADIUS}
            bgColor={theme.colors.white}
            boxShadow={PANEL_SHADOW}
          >
            {!searchIsOpen && <Categories />}
            {searchIsOpen && <Search />}
          </Flex>
        </ScaleFade>
      </Box>
    </Box>
  )
}

export default MapPanel
