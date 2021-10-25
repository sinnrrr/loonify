import { useColorModeValue } from "@chakra-ui/color-mode"

export const useBrandColor = (asScheme: boolean = false) => {
  return useColorModeValue(asScheme ? "purple" : "purple.400", asScheme ? "yellow" : "yellow.400")
}
