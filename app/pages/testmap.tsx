import { BlitzPage } from "@blitzjs/core"
import { Flex } from "@chakra-ui/layout"
import Map from "app/map/components/Map"
import Layout from "app/core/layouts/Layout"

const TestMapPage: BlitzPage = () => {
  return (
    <Flex grow={1}>
      <Map mode="edit" />
    </Flex>
  )
}

TestMapPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestMapPage
