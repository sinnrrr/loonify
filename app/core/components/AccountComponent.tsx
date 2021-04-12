import { User } from "db"
import theme from "@chakra-ui/theme"
import { FunctionComponent } from "react"
import { Avatar } from "@chakra-ui/avatar"
import { Box, Heading, HStack, Text } from "@chakra-ui/layout"

const AccountComponent: FunctionComponent<{ name: string }> = ({ name }) => (
  <HStack justify="flex-start" spacing={theme.space[4]}>
    <Avatar size="md" />
    <Box>
      <Heading size="lg">{name}</Heading>
      <Text>On service since 20.03.2021</Text>
    </Box>
  </HStack>
)

export default AccountComponent
