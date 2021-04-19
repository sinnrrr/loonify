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
  const [deletePostMutation, { isLoading: postIsDeleting }] = useMutation(deletePost)
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef(null)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Поділитись оголошенням",
        description: "Посилання скопійовано в буфер обміну",
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
            <Text>На сервісі з {account.createdAt.toLocaleDateString()}</Text>
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
                Опції
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<DownloadIcon />}
                  onClick={() => {
                    window.open(generateApiUrl(`/posts/${post.id}/pdf`), "_blank")!.focus()
                  }}
                >
                  Офлайн оголошення
                </MenuItem>
                <MenuItem icon={<LinkIcon />} onClick={onCopy}>
                  Поділитись
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={() => setIsOpen(true)}>
                  Видалити
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
              Зв'язатись
            </Button>
          )}
        </HStack>
      </VStack>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Видалення оголошення
            </AlertDialogHeader>

            <AlertDialogBody>Ви впевнені? Ви не зможете скасувати цю дію згодом.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Відміна
              </Button>
              <Button
                isLoading={postIsDeleting}
                colorScheme="red"
                onClick={() => {
                  deletePostMutation({ id: post.id })
                    .then(indexRedirect)
                    .then(() => {
                      toast({
                        title: "Оголошення було успішно видалене",
                        status: "success",
                        duration: 2000,
                      })
                    })
                }}
                ml={3}
              >
                Видалити
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AccountBlock
