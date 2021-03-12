import React from "react"
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react"

const Header = () => {
  return (
    <Flex as="header" p="2" align="center">
      <Box>
        <Heading size="md">Loonify</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="teal">Log in</Button>
      </Box>
    </Flex>
  )
}

export default Header
