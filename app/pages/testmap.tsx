import { Flex } from "@chakra-ui/layout"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"

const TestMapPage: BlitzPage = () => {
  return <Flex grow={1}></Flex>
}

TestMapPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestMapPage
