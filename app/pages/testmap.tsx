import { BlitzPage } from "@blitzjs/core"
import { Flex } from "@chakra-ui/layout"
import Map from "app/core/components/Map"
import Layout from "app/core/layouts/Layout"

const TestMapPage: BlitzPage = () => {
  return (
    <Flex grow={1}>
      <Map />
    </Flex>
  )
}

TestMapPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestMapPage
