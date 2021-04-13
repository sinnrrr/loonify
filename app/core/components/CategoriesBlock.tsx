import { Button } from "@chakra-ui/button"
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"

const CategoryComponent = () => (
  <Button isFullWidth>
    <Text fontSize={theme.fontSizes.xl} fontWeight={theme.fontWeights.bold}>
      Hello
    </Text>
  </Button>
)

const CategoriesBlock = () => (
  <VStack align="flex-start" w="100%">
    <CategoryComponent />
  </VStack>
)

export default CategoriesBlock
