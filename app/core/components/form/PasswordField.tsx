import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { useState } from "react"
import { FormFieldProps } from "types"
import { PASSWORD_FORM_KEY } from "../../../auth/constants"

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
}: PasswordFieldProps & {
  showPassword: boolean
  setShowPassword: (as: boolean) => void
}): FormComponentProps => ({
  isRequired: true,
  getError,
  label: confirmal ? "Повторний пароль" : "Пароль",
  helperText: confirmal ? "Повторіть пароль" : "Пароль до аккаунту",
  children: (
    <InputGroup>
      <Input
        type={showPassword ? "text" : "password"}
        autoComplete={confirmal || passwordIsNew ? "new-password" : "current-password"}
        name={PASSWORD_FORM_KEY}
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

const PasswordField = ({ getError, register }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const passwordFieldProps = passwordFieldAsProps({
    setShowPassword,
    showPassword,
    getError,
    register,
  })

  return <FormComponent {...passwordFieldProps} />
}

export default PasswordField
