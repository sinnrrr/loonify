import { Button } from "@chakra-ui/button"
import { Heading, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"

const CategoryComponent = () => (
  <Button isFullWidth>
    <Text fontSize={theme.fontSizes.xl} fontWeight={theme.fontWeights.bold}>
      Hello
    </Text>
  </Button>
)

const CategoriesPanel = () => (
  <VStack spacing={4} align="flex-start">
    <Heading>Categories</Heading>
    <VStack spacing={4} w="100%">
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
    </VStack>
  </VStack>
)

export default CategoriesPanel
