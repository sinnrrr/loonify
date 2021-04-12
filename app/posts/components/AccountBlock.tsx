import { useRouter } from "@blitzjs/core"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { generateApiUrl } from "app/core/hooks/useRequest"
import { Post, User } from "db"
import { FunctionComponent } from "react"
import { useAuthor } from "../hooks/useAuthor"
import { useModalStore } from "app/core/stores/modal"
import OptionsModal from "./OptionsModal"

const AccountBlock: FunctionComponent<{ post: Post; account: User }> = ({ post, account }) => {
  const modal = useModalStore()
  // () => window.open(generateApiUrl(`/posts/${post.id}/pdf`), "_blank")!.focus()
  const viewerIsOwner = useAuthor(post.ownerId)
  const isCreating = !!!post

  return (
    <VStack
      align="start"
      spacing={theme.space[4]}
      mt={{ base: theme.space[8], md: theme.space[0] }}
      mb={{ base: theme.space[8], md: theme.space[8] }}
    >
      <HStack alignItems="start" spacing={theme.space[4]}>
        <Avatar size="lg" />
        <Box>
          <Heading size="lg">{account.name}</Heading>
          <Text>On service since 20.03.2021</Text>
        </Box>
      </HStack>
      <HStack width="100%">
        {isCreating ? (
          <Button>Save</Button>
        ) : (
          <Button
            isFullWidth
            onClick={viewerIsOwner ? modal.onOpen(<OptionsModal />) : () => {}}
            size="lg"
          >
            {viewerIsOwner ? "Options" : "Contact"}
          </Button>
        )}
      </HStack>
    </VStack>
  )
}

export default AccountBlock
