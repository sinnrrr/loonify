import { useRouter } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { ReactNode, useState } from "react"
import { FormFieldProps } from "types"
import { CONFIRMATION_FORM_KEY, PASSWORD_FORM_KEY } from "../../../auth/constants"

export type PasswordFieldProps = FormFieldProps & {
  confirmal?: boolean
  passwordIsNew?: boolean
}

export const passwordFieldAsProps = ({
  getError,
  register,
  confirmal = false,
  passwordIsNew = false,
  showPassword,
  setShowPassword,
  rightElement,
}: PasswordFieldProps & {
  showPassword: boolean
  setShowPassword: (as: boolean) => void
  rightElement?: ReactNode
}): FormComponentProps => ({
  isRequired: true,
  getError,
  rightElement,
  label: confirmal ? "Повторний пароль" : "Пароль",
  helperText: confirmal ? "Повторіть пароль" : "Пароль до аккаунту",
  children: (
    <InputGroup>
      <Input
        type={showPassword ? "text" : "password"}
        autoComplete={confirmal || passwordIsNew ? "new-password" : "current-password"}
        name={confirmal ? CONFIRMATION_FORM_KEY : PASSWORD_FORM_KEY}
        ref={register}
        placeholder={confirmal ? "Уведіть повторний пароль" : "Уведіть пароль"}
      />
      {!confirmal && (
        <InputRightElement
          cursor="pointer"
          children={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </InputGroup>
  ),
})

const PasswordField = ({
  getError,
  register,
  confirmal = false,
  passwordIsNew = false,
}: PasswordFieldProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const passwordFieldProps = passwordFieldAsProps({
    setShowPassword,
    showPassword,
    getError,
    register,
  })

  const ForgotPasswordButton = () => (
    <Button
      variant="link"
      color={useColorModeValue("purple.600", "yellow.400")}
      onClick={() => router.push("/forgot/password")}
    >
      Забули пароль?
    </Button>
  )

  return (
    <FormComponent
      rightElement={!confirmal && !passwordIsNew && <ForgotPasswordButton />}
      {...passwordFieldProps}
    />
  )
}

export default PasswordField
