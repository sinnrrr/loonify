import { Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"

const CategoryComponent = () => (
  <HStack flexGrow={1}>
    <Text fontWeight={theme.fontWeights.bold}>Hello</Text>
  </HStack>
)

const CategoriesBlock = () => (
  <VStack flexGrow={1}>
    <CategoryComponent />
  </VStack>
)

export default CategoriesBlock
