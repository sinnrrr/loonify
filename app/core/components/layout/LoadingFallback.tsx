import { Flex } from "@chakra-ui/layout"
import Logo from "../images/Logo"

const LoadingFallback = () => (
  <Flex grow={1} justify="center" align="center">
    <Logo />
  </Flex>
)

export default LoadingFallback
