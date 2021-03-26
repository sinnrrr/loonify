import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { Post, User } from "db"
import { FunctionComponent } from "react"

const AccountBlock: FunctionComponent<{ post: Post; account: User }> = ({ post, account }) => {
  const isCreating = !!!post

  return (
    <VStack
      mt={{ base: theme.space[8], md: theme.space[0] }}
      mb={{ base: theme.space[8], md: theme.space[8] }}
      align="start"
      spacing={theme.space[4]}
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
          <>
            <Button isFullWidth size="lg">
              Contact
            </Button>
            <Button isFullWidth size="lg">
              Pdf
            </Button>
          </>
        )}
      </HStack>
    </VStack>
  )
}

export default AccountBlock
