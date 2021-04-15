import { FunctionComponent } from "react"
import { Heading, HStack } from "@chakra-ui/layout"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from "@blitzjs/core"

const MiddlePanel: FunctionComponent<{ heading: string }> = ({ heading }) => {
  const router = useRouter()
  const redirectTo = "/office"

  return (
    <HStack>
      {router.asPath !== redirectTo && (
        <ArrowBackIcon cursor="pointer" w={10} h={10} onClick={() => router.push(redirectTo)} />
      )}
      <Heading>{heading}</Heading>
    </HStack>
  )
}

export default MiddlePanel
