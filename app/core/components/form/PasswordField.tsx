import { useRouter } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { FunctionComponent, ReactNode, useState } from "react"
import { FormFieldProps, Loadable } from "types"
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
  isLoading,
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
        isDisabled={isLoading}
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
  isLoading,
}: PasswordFieldProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const passwordFieldProps = passwordFieldAsProps({
    setShowPassword,
    showPassword,
    getError,
    register,
    isLoading,
  })

  const ForgotPasswordButton: FunctionComponent<Loadable> = ({ isLoading }) => (
    <Button
      variant="link"
      isDisabled={isLoading}
      color={useColorModeValue("purple.600", "yellow.400")}
      onClick={() => router.push("/forgot/password")}
    >
      Забули пароль?
    </Button>
  )

  return (
    <FormComponent
      rightElement={!confirmal && !passwordIsNew && <ForgotPasswordButton isLoading={isLoading} />}
      {...passwordFieldProps}
    />
  )
}

export default PasswordField
