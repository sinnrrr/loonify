import { useMutation } from "@blitzjs/core"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { useClipboard } from "@chakra-ui/hooks"
import { ChevronDownIcon, DeleteIcon, DownloadIcon, LinkIcon, SettingsIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal"
import theme from "@chakra-ui/theme"
import { useToast } from "@chakra-ui/toast"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"
import { generateApiUrl } from "app/core/hooks/useRequest"
import { Post, User } from "db"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import { useAuthor } from "../hooks/useAuthor"
import deletePost from "../mutations/deletePost"

const AccountBlock: FunctionComponent<{ post: Post; account: User }> = ({ post, account }) => {
  const toast = useToast()
  const indexRedirect = useIndexRedirect()
  const viewerIsOwner = useAuthor(post.ownerId)
  const { onCopy, hasCopied } = useClipboard(window.location.href)
  const [deletePostMutation] = useMutation(deletePost)
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef(null)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Share post",
        description: "The link copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      }) as void
    }
  }, [onCopy, hasCopied, toast])

  return (
    <>
      <VStack
        align="start"
        spacing={theme.space[4]}
        mt={{ base: theme.space[8], md: theme.space[0] }}
        mb={{ base: theme.space[8], md: theme.space[8] }}
      >
        <HStack justify="flex-start" spacing={theme.space[4]}>
          <Avatar size="md" />
          <Box>
            <Heading size="lg">{account.firstName + (account.lastName || "")}</Heading>
            <Text>On service since 20.03.2021</Text>
          </Box>
        </HStack>
        <HStack width="100%">
          {viewerIsOwner ? (
            <Menu>
              <MenuButton
                isFullWidth
                size="lg"
                as={Button}
                leftIcon={<SettingsIcon />}
                rightIcon={<ChevronDownIcon />}
              >
                Options
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<DownloadIcon />}
                  onClick={() => {
                    window.open(generateApiUrl(`/posts/${post.id}/pdf`), "_blank")!.focus()
                  }}
                >
                  Generate offline
                </MenuItem>
                <MenuItem icon={<LinkIcon />} onClick={onCopy}>
                  Share
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={() => setIsOpen(true)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              isFullWidth
              size="lg"
              onClick={() => {
                window.open(account.phone ? `tel:${account.phone}` : `mailto:${account.email}`)
              }}
            >
              Contact
            </Button>
          )}
        </HStack>
      </VStack>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete post
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePostMutation({ id: post.id })
                    .then(indexRedirect)
                    .then(() => {
                      toast({ title: "Post have been deleted", status: "success", duration: 2000 })
                    })
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AccountBlock
