import { Heading, VStack } from "@chakra-ui/layout"
import CategoriesBlock from "./CategoriesBlock"

const HelloComponent = () => (
  <VStack align="flex-start" flexGrow={1}>
    <Heading>Categories</Heading>
    <CategoriesBlock />
  </VStack>
)

export default HelloComponent
