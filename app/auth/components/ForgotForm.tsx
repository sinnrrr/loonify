import { useMutation } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { Heading, Text } from "@chakra-ui/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailFieldAsProps } from "app/core/components/form/EmailField"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"
import { SubmittableFormProps } from "types"
import { EMAIL_FORM_KEY } from "../constants"
import forgotPassword from "../mutations/forgotPassword"
import { ForgotPassword } from "../validations"
import AuthForm from "./AuthForm"

const ForgotForm: FunctionComponent<SubmittableFormProps> = () => {
  const indexRedirect = useIndexRedirect()
  const brandScheme = useBrandColor(true)
  const [forgotPasswordMutation, { isLoading, isSuccess }] = useMutation(forgotPassword)
  const { errors, register, getValues, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(ForgotPassword),
  })

  return (
    <AuthForm
      isValid={formState.isValid}
      submitText={isSuccess ? "Окей" : "Відновити"}
      isLoading={isLoading}
      onSubmit={async (e) => {
        e.preventDefault()
        forgotPasswordMutation(getValues())
      }}
      headerChild={<Heading>Відновити пароль</Heading>}
      formFields={[
        emailFieldAsProps({ getError: () => errors[EMAIL_FORM_KEY], register, isLoading }),
      ]}
    >
      {isSuccess && (
        <>
          <Text align="center">Інструкції з відновлення паролю була відправлена на вашу пошту</Text>

          <Button
            size="lg"
            colorScheme={brandScheme}
            isFullWidth
            onClick={indexRedirect}
            type="button"
          >
            Окей
          </Button>
        </>
      )}
    </AuthForm>
  )
}

export default ForgotForm
