import { BlitzPage } from "@blitzjs/core"
import { Flex } from "@chakra-ui/layout"
import Layout from "app/core/layouts/Layout"
import CustomMap from "app/map/components/MapboxMap"

const TestMapPage: BlitzPage = () => {
  return (
    <Flex grow={1}>
      <CustomMap />
    </Flex>
  )
}

TestMapPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestMapPage
