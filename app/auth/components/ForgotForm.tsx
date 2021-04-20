import { useMutation } from "@blitzjs/core"
import { Box, Heading, Link, Text } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailFieldAsProps } from "app/core/components/form/EmailField"
import { useForm } from "react-hook-form"
import { EMAIL_FORM_KEY } from "../constants"
import forgotPassword from "../mutations/forgotPassword"
import { ForgotPassword } from "../validations"
import AuthForm from "./AuthForm"

const ForgotForm = () => {
  const [forgotPasswordMutation] = useMutation(forgotPassword)
  const { errors, register, getValues } = useForm({
    mode: "onChange",
    resolver: zodResolver(ForgotPassword),
  })

  return (
    <AuthForm
      onSubmit={async (e) => {
        e.preventDefault()
        forgotPasswordMutation(getValues())
      }}
      headerChild={<Heading>Відновити пароль</Heading>}
      submitText="Відновити"
      formFields={[emailFieldAsProps({ getError: () => errors[EMAIL_FORM_KEY], register })]}
    />
  )
}

export default ForgotForm
