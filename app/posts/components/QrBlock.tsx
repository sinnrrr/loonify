import { Heading, VStack } from "@chakra-ui/layout"
import QRCode from "qrcode.react"
import theme from "theme"

const QrBlock = () => {
  return (
    <VStack align="flex-start" w="100%">
      <Heading>QR-код</Heading>
      <QRCode
        width="100%"
        height="min-content"
        renderAs="svg"
        fgColor={theme.colors.purple[400]}
        value={window.location.href}
      />
    </VStack>
  )
}

export default QrBlock
