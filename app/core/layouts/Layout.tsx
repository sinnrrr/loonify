import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Flex } from "@chakra-ui/react"
// import Header from "../components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "loonify"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" minHeight="100vh">
        {/* <Header /> */}
        <Flex as="main" grow="1">
          {children}
        </Flex>
      </Flex>
    </>
  )
}

export default Layout
