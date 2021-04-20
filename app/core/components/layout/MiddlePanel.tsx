import { FunctionComponent } from "react"
import { Heading, HStack } from "@chakra-ui/layout"
import { useRouter } from "@blitzjs/core"
import theme from "@chakra-ui/theme"
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
