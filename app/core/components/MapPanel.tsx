import React, { ReactNode, useEffect } from "react"
import { Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { usePanelStore } from "app/core/stores/panel"
import { Collapse, Slide } from "@chakra-ui/transition"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  HamburgerIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons"
import SearchPanel from "./SearchPanel"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useMutation, useRouter } from "@blitzjs/core"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Avatar } from "@chakra-ui/avatar"
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu"
import logout from "app/auth/mutations/logout"
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import CategoriesPanel from "./CategoriesPanel"
import { Portal } from "@chakra-ui/portal"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { useDisclosure } from "@chakra-ui/hooks"
import ViewPanel from "./ViewPanel"
import { usePanelRedirect } from "../hooks/usePanelRedirect"

const MapPanel = () => {
  const {
    currentChildren,
    setCurrentChildren,
    setPreviousChildren,
    isOpen,
    setOpen,
    setClose,
    searchQuery,
    setSearchQuery,
    selectedPost,
  } = usePanelStore()

  const router = useRouter()
  const user = useCurrentUser()
  const openOnInit = useBreakpointValue({ base: false, sm: true })

  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen: modalIsOpen, onClose: modalOnClose, onOpen: modalOnOpen } = useDisclosure()

  if (!currentChildren) setCurrentChildren(<CategoriesPanel />)

  useEffect(() => {
    if (openOnInit) setOpen()
  }, [openOnInit, setOpen])

  useEffect(() => {
    let newComponent: ReactNode = null

    if (searchQuery) newComponent = <SearchPanel />
    else newComponent = <CategoriesPanel />

    if (selectedPost) newComponent = <ViewPanel />

    if (newComponent) setCurrentChildren(newComponent)
  }, [searchQuery, selectedPost, setCurrentChildren])

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
          bgColor={useColorModeValue(theme.colors.white, theme.colors.gray[800])}
          direction="column"
          boxShadow={theme.shadows["2xl"]}
          zIndex={theme.zIndices.docked}
        >
          {/* Upper panel */}
          {/* <Collapse in={upperIsOpen} animateOpacity> */}
          <VStack align="flex-start" p={theme.space[4]}>
            <HStack justify="space-between" w="100%">
              <IconButton onClick={setClose} icon={<CloseIcon />} aria-label="Close menu button" />
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
                    <MenuItem isDisabled>My Account</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={toggleColorMode}>Theme: {colorMode}</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => logoutMutation()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button w="50%" onClick={() => router.push("/login")}>
                    Login
                  </Button>
                  <Button w="50%" onClick={() => router.push("/signup")}>
                    Signup
                  </Button>
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
              <IconButton aria-label="Help" icon={<QuestionOutlineIcon />} onClick={modalOnOpen} />
              <Portal>
                <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Post options</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laboriosam quos
                      doloribus repellendus beatae. Repellat, adipisci exercitationem ducimus
                      officiis quam, eligendi, dolorem ad molestiae sapiente vero sint dignissimos
                      aperiam necessitatibus?
                    </ModalBody>

                    <ModalFooter />
                  </ModalContent>
                </Modal>
              </Portal>
            </HStack>
            <Button isFullWidth onClick={() => router.push("/posts/new")}>
              Create post
            </Button>
          </VStack>
          {/* </Collapse> */}
          {/* Upper panel divider */}
          <Divider />
          {/* Upper panel toggler */}
          {/* <Flex justify="center">
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
          </Flex> */}
          {/* Drawer body content */}
          <Flex grow={1} p={theme.space[4]} direction="column" maxH="100%">
            {currentChildren}
          </Flex>
        </Flex>
      </Slide>
    </>
  )
}

export default MapPanel
