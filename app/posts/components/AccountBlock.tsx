import { useRouter } from "@blitzjs/core"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { Portal } from "@chakra-ui/portal"
import theme from "@chakra-ui/theme"
import { generateApiUrl } from "app/core/hooks/useRequest"
import { Post, User } from "db"
import { FunctionComponent } from "react"
import { useAuthor } from "../hooks/useAuthor"

const AccountBlock: FunctionComponent<{ post: Post; account: User }> = ({ post, account }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  // () => window.open(generateApiUrl(`/posts/${post.id}/pdf`), "_blank")!.focus()
  const viewerIsOwner = useAuthor(post.ownerId)

  return (
    <VStack
      align="start"
      spacing={theme.space[4]}
      mt={{ base: theme.space[8], md: theme.space[0] }}
      mb={{ base: theme.space[8], md: theme.space[8] }}
    >
      <HStack justify="flex-start" spacing={theme.space[4]}>
        <Avatar size="md" />
        <Box>
          <Heading size="lg">{account.name}</Heading>
          <Text>On service since 20.03.2021</Text>
        </Box>
      </HStack>
      <HStack width="100%">
        <Button
          size="lg"
          isFullWidth
          onClick={() => {
            if (viewerIsOwner) onOpen()
          }}
        >
          {viewerIsOwner ? "Options" : "Contact"}
        </Button>
        <Portal>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Post options</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laboriosam quos
                doloribus repellendus beatae. Repellat, adipisci exercitationem ducimus officiis
                quam, eligendi, dolorem ad molestiae sapiente vero sint dignissimos aperiam
                necessitatibus?
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
        </Portal>
      </HStack>
    </VStack>
  )
}

export default AccountBlock
