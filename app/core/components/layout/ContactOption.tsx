import type { IconProps } from "@chakra-ui/icon"
import type { ComponentWithAs } from "@chakra-ui/system"
import type { FunctionComponent } from "react"

import { Button } from "@chakra-ui/button"
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"

const PHONE_VARIANT = "phone" as const
const EMAIL_VARIANT = "email" as const

type ContactOptionProps = {
  variant: typeof PHONE_VARIANT | typeof EMAIL_VARIANT
  data: string
}

const ContactOption: FunctionComponent<ContactOptionProps> = ({ variant, data }) => {
  const Icon: ComponentWithAs<"svg", IconProps> = variant === PHONE_VARIANT ? PhoneIcon : EmailIcon

  return (
    <Button variant="link">
      <Icon mr={theme.space[1]} />
      <Text>{data}</Text>
    </Button>
  )
}

export default ContactOption
