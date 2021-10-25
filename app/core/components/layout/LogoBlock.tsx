import { ChevronLeftIcon } from "@chakra-ui/icons"
import { HStack, Text } from "@chakra-ui/layout"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"
import { FunctionComponent } from "react"
import Logo from "../images/Logo"

const LogoBlock: FunctionComponent<{ canRedirectBack?: boolean }> = ({
  canRedirectBack = false,
}) => {
  const brandColor = useBrandColor()
  const indexRedirect = useIndexRedirect()

  return (
    <HStack w="100%" cursor="pointer" onClick={indexRedirect}>
      {canRedirectBack && <ChevronLeftIcon h="100%" w={10} color={brandColor} />}
      <Logo height={50} width={50} />
      <Text fontWeight="black" color={useBrandColor()} fontSize={20}>
        Бюро знахідок <br /> майбутнього
      </Text>
    </HStack>
  )
}

export default LogoBlock
