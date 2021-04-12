import React, { useEffect } from "react"
import { Box, Flex, HStack, Text } from "@chakra-ui/layout"
import { Button, IconButton } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { usePanelStore } from "app/core/stores/panel"
import { Slide } from "@chakra-ui/transition"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons"
import SearchComponent from "./SearchComponent"
import HelloComponent from "./HelloComponent"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useRouter } from "@blitzjs/core"
import { useCurrentUser } from "../hooks/useCurrentUser"
import AccountComponent from "./AccountComponent"

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

  const router = useRouter()
  const user = useCurrentUser()

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
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
              <Input placeholder="Search here" onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <IconButton onClick={setClose} icon={<CloseIcon />} aria-label="Close menu button" />
          </HStack>
          <Flex grow={1} justify="space-between" direction="column">
            <Flex p={theme.space[4]}>{children}</Flex>
            <Box
              p={theme.space[4]}
              borderTop={theme.borders["1px"]}
              borderColor={theme.colors.gray[200]}
            >
              {user ? (
                <AccountComponent name={user.name} />
              ) : (
                <HStack>
                  <Button onClick={() => router.push("/login")}>Login</Button>
                  <Button onClick={() => router.push("/signup")}>Signup</Button>
                </HStack>
              )}
            </Box>
          </Flex>
        </Flex>
      </Slide>
    </>
  )
}

export default MapPanel
