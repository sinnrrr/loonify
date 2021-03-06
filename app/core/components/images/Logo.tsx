import { useColorModeValue } from "@chakra-ui/color-mode"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { FunctionComponent } from "react"
import theme from "theme"

export type LogoImageProps = {
  width?: number | string
  height?: number | string
}

const Logo: FunctionComponent<LogoImageProps> = ({ width = 100, height = 100 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" fill={useColorModeValue("white", "gray.400")} />
    <path
      d="M0 25V50H25H50V25V0H25H0V25ZM21.875 14.0625V18.75H17.1875H12.5V14.0625V9.375H17.1875H21.875V14.0625ZM37.5 14.0625V18.75H32.8125H28.125V14.0625V9.375H32.8125H37.5V14.0625ZM18.75 34.375V37.5H25H31.25V34.375V31.25H34.375H37.5V37.5V43.75H25H12.5V37.5V31.25H15.625H18.75V34.375Z"
      fill={theme.colors[useBrandColor(true)][400]}
    />
  </svg>
)

export default Logo
