import { Box, Heading, Text } from "@chakra-ui/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { useForm } from "react-hook-form"
import { Login } from "../validations"
import { EMAIL_FORM_KEY, PASSWORD_FORM_KEY } from "../constants"
import AuthForm from "./AuthForm"
import { AuthenticationError, useMutation } from "@blitzjs/core"
import login from "../mutations/login"
import { SubmittableFormProps } from "types"
import NextLink from "next/link"
import { emailFieldAsProps } from "app/core/components/form/EmailField"
import { passwordFieldAsProps } from "app/core/components/form/PasswordField"

const LoginForm: FunctionComponent<SubmittableFormProps> = ({ onSuccess }) => {
  const [loginMutation] = useMutation(login)
  const [showPassword, setShowPassword] = useState(false)

  const { errors, register, getValues, setError } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(Login),
  })

  return (
    <AuthForm
      onSubmit={async (e) => {
        e.preventDefault()

        try {
          await loginMutation(getValues())
          onSuccess?.()
        } catch (error) {
          setError("email", {
            type: "manual",
            message:
              error instanceof AuthenticationError
                ? "Введені дані не зходяться з нашими записами"
                : "Виникла несподівана помилка. Спробуйте ще раз.",
          })
        }
      }}
      headerChild={
        <Box textAlign="center">
          <Heading>Увійдіть у ваш аккаунт</Heading>
          <Text>
            Не маєте аккаунту?{" "}
            <Link as={NextLink} color="purple.600" href="/signup">
              Зареєструватись
            </Link>
          </Text>
        </Box>
      }
      submitText="Увійти"
      formFields={[
        emailFieldAsProps({ getError: () => errors[EMAIL_FORM_KEY], register }),
        passwordFieldAsProps({
          getError: () => errors[PASSWORD_FORM_KEY],
          register,
          showPassword,
          setShowPassword,
        }),
      ]}
    />
  )
}

export default LoginForm
