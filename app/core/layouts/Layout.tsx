import React, { ReactNode, Suspense } from "react"
import { Flex } from "@chakra-ui/react"
import LoadingSuspense from "../components/layout/LoadingFallback"

export type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex as="main" grow={1}>
        <Suspense fallback={<LoadingSuspense />}>{children}</Suspense>
      </Flex>
    </Flex>
  )
}

export default Layout
