import React, { ReactNode } from "react"
import { Flex } from "@chakra-ui/react"

export type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex as="main" grow={1}>
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout
