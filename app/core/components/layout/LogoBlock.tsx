import { Box, HStack, Text } from "@chakra-ui/layout"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"
import Logo from "../images/Logo"

const LogoBlock = () => {
  const indexRedirect = useIndexRedirect()

  return (
    <HStack cursor="pointer" onClick={indexRedirect}>
      <Logo height={50} width={50} />
      <Text fontWeight="black" color={useBrandColor()} fontSize={20}>
        Бюро знахідок <br /> майбутнього
      </Text>
    </HStack>
  )
}

export default LogoBlock
