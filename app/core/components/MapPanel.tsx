import React, { useEffect } from "react"
import { Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { usePanelStore } from "app/core/stores/panel"
import { Collapse, Slide, SlideFade } from "@chakra-ui/transition"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  HamburgerIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons"
import SearchComponent from "./SearchComponent"
import HelloComponent from "./HelloComponent"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useMutation, useRouter } from "@blitzjs/core"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Avatar } from "@chakra-ui/avatar"
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu"
import logout from "app/auth/mutations/logout"

const MapPanel = () => {
  const {
    children,
    setChildren,
    isOpen,
    setOpen,
    setClose,
    searchQuery,
    setSearchQuery,
    upperIsOpen,
    upperToggleIsOpen,
  } = usePanelStore()

  const router = useRouter()
  const user = useCurrentUser()

  const [logoutMutation] = useMutation(logout)

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
      {/* Drawer */}
      <Slide
        in={isOpen}
        direction="left"
        style={{ zIndex: theme.zIndices.docked, maxWidth: theme.sizes.xs }}
      >
        {/* Drawer body */}
        <Flex
          h="100vh"
          overflowY="auto"
          bgColor="white"
          direction="column"
          boxShadow={theme.shadows["2xl"]}
          zIndex={theme.zIndices.docked}
        >
          {/* Upper panel */}
          <Collapse in={upperIsOpen} animateOpacity>
            <VStack align="flex-start" p={theme.space[4]}>
              <HStack justify="space-between" w="100%">
                <IconButton
                  onClick={setClose}
                  icon={<CloseIcon />}
                  aria-label="Close menu button"
                />
                {user ? (
                  <Menu>
                    <MenuButton isFullWidth as={Button} rightIcon={<ChevronDownIcon />}>
                      <HStack>
                        <Avatar size="xs" />
                        <Text wordBreak="break-word" fontSize={theme.fontSizes.xl}>
                          {user.name}
                        </Text>
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem>My Account</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={() => logoutMutation()}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Button onClick={() => router.push("/login")}>Login</Button>
                    <Button onClick={() => router.push("/signup")}>Signup</Button>
                  </>
                )}
              </HStack>
              <HStack>
                <InputGroup>
                  <InputLeftElement
                    zIndex={theme.zIndices.base}
                    pointerEvents="none"
                    children={<SearchIcon />}
                  />
                  <Input
                    placeholder="Search here"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
                <IconButton aria-label="Help" icon={<QuestionOutlineIcon />} />
              </HStack>
              <Button isFullWidth onClick={() => router.push("/posts/new")}>
                Create post
              </Button>
            </VStack>
          </Collapse>
          {/* Upper panel divider */}
          <Divider />
          {/* Upper panel toggler */}
          <Flex justify="center">
            <Button
              size="xs"
              aria-label="Toggle upper panel"
              px={theme.space[8]}
              borderTopRadius={theme.radii.none}
              borderBottomRadius={theme.radii["3xl"]}
              onClick={upperToggleIsOpen}
            >
              {upperIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </Flex>
          {/* Drawer body content */}
          <Flex grow={1} p={theme.space[4]} direction="column">
            {children}
          </Flex>
        </Flex>
      </Slide>
    </>
  )
}

export default MapPanel
