import React, { useEffect } from "react"
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { usePanelStore } from "app/core/stores/panel"
import { Slide } from "@chakra-ui/transition"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import {
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  QuestionIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons"
import SearchComponent from "./SearchComponent"
import HelloComponent from "./HelloComponent"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useMutation, useRouter } from "@blitzjs/core"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Avatar } from "@chakra-ui/avatar"
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/menu"
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
          <VStack
            align="flex-start"
            p={theme.space[4]}
            borderBottom={theme.borders["1px"]}
            borderColor={theme.colors.gray[200]}
          >
            <HStack>
              <IconButton onClick={setClose} icon={<CloseIcon />} aria-label="Close menu button" />
              {user ? (
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
                <Input placeholder="Search here" onChange={(e) => setSearchQuery(e.target.value)} />
              </InputGroup>
              <IconButton aria-label="Help" icon={<QuestionIcon />} />
            </HStack>
            <Button isFullWidth onClick={() => router.push("/posts/new")}>
              Create post
            </Button>
          </VStack>
          <Flex grow={1} justify="space-between" direction="column">
            <Flex p={theme.space[4]}>{children}</Flex>
          </Flex>
        </Flex>
      </Slide>
    </>
  )
}

export default MapPanel
