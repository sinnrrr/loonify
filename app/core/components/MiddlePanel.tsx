import { FunctionComponent } from "react"
import { Heading, HStack } from "@chakra-ui/layout"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from "@blitzjs/core"

const MiddlePanel: FunctionComponent<{ heading: string }> = ({ heading }) => {
  const router = useRouter()
  const redirectBase = "/office"

  return (
    <HStack>
      {router.asPath !== redirectBase && (
        <ArrowBackIcon cursor="pointer" w={10} h={10} onClick={() => router.back()} />
      )}
      <Heading>{heading}</Heading>
    </HStack>
  )
}

export default MiddlePanel
