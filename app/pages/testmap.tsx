import { BlitzPage } from "@blitzjs/core"
import { Flex } from "@chakra-ui/layout"
import Layout from "app/core/layouts/Layout"

const TestMapPage: BlitzPage = () => {
  return <Flex grow={1}></Flex>
}

TestMapPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestMapPage
