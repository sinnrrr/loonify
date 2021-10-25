import { Heading, HStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { useRouter } from "blitz"
import { FunctionComponent } from "react"
import BackArrow from "./BackArrow"

const MiddlePanel: FunctionComponent<{ heading: string }> = ({ heading }) => {
  const router = useRouter()
  const redirectBase = "/office"

  return (
    <HStack mb={theme.space[2]}>
      {router.asPath !== redirectBase && <BackArrow />}
      <Heading>{heading}</Heading>
    </HStack>
  )
}

export default MiddlePanel
