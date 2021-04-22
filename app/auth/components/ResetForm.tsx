import { useMutation, useRouterQuery } from "@blitzjs/core"
import { Heading } from "@chakra-ui/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordFieldAsProps } from "app/core/components/form/PasswordField"
import { FunctionComponent, useState } from "react"
import { useForm } from "react-hook-form"
import { SubmittableFormProps } from "types"
import { CONFIRMATION_FORM_KEY, PASSWORD_FORM_KEY } from "../constants"
import resetPassword from "../mutations/resetPassword"
import { ResetPassword } from "../validations"
import AuthForm from "./AuthForm"

const ResetForm: FunctionComponent<SubmittableFormProps> = ({ onSuccess }) => {
  const query = useRouterQuery()
  const [showPassword, setShowPassword] = useState(false)
  const [resetPasswordMutation, { isLoading }] = useMutation(resetPassword)
  const { errors, register, getValues, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(ResetPassword),
  })

  return (
    <AuthForm
      isValid={formState.isValid}
      isLoading={isLoading}
      onSubmit={async (e) => {
        e.preventDefault()
        resetPasswordMutation({ ...getValues(), token: query.token as string }).then(onSuccess)
      }}
      headerChild={<Heading>Новий пароль</Heading>}
      submitText="Встановити"
      formFields={[
        passwordFieldAsProps({
          getError: () => errors[PASSWORD_FORM_KEY],
          register,
          passwordIsNew: true,
          showPassword,
          setShowPassword,
        }),
        passwordFieldAsProps({
          getError: () => errors[CONFIRMATION_FORM_KEY],
          register,
          confirmal: true,
          passwordIsNew: true,
          showPassword,
          setShowPassword,
        }),
      ]}
    />
  )
}

export default ResetForm
