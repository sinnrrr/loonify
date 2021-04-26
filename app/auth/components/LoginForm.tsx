import { Box, Heading, Text } from "@chakra-ui/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { useForm } from "react-hook-form"
import { Login } from "../validations"
import { EMAIL_FORM_KEY, PASSWORD_FORM_KEY } from "../constants"
import AuthForm from "./AuthForm"
import { AuthenticationError, useMutation, useRouter } from "@blitzjs/core"
import login from "../mutations/login"
import { SubmittableFormProps } from "types"
import { emailFieldAsProps } from "app/core/components/form/EmailField"
import { passwordFieldAsProps } from "app/core/components/form/PasswordField"
import { useBrandColor } from "app/core/hooks/useBrandColor"

const LoginForm: FunctionComponent<SubmittableFormProps> = ({ onSuccess }) => {
  const router = useRouter()
  const brandColorScheme = useBrandColor(true)
  const [loginMutation, { isLoading }] = useMutation(login)
  const [showPassword, setShowPassword] = useState(false)

  const { errors, register, getValues, setError, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(Login),
  })

  return (
    <AuthForm
      isValid={formState.isValid}
      isLoading={isLoading}
      onSubmit={(e) => {
        e.preventDefault()

        loginMutation(getValues())
          .then(onSuccess)
          .catch((error) => {
            setError("email", {
              type: "manual",
              message:
                error instanceof AuthenticationError
                  ? "Введені дані не зходяться з нашими записами"
                  : "Виникла несподівана помилка. Спробуйте ще раз.",
            })
          })
      }}
      headerChild={
        <Box textAlign="center">
          <Heading>Увійдіть у ваш аккаунт</Heading>
          <Text>
            Не маєте аккаунту?{" "}
            <Button
              variant="link"
              colorScheme={brandColorScheme}
              onClick={() => router.push("/signup")}
            >
              Зареєструватись
            </Button>
          </Text>
        </Box>
      }
      submitText="Увійти"
      formFields={[
        emailFieldAsProps({
          getError: () => errors[EMAIL_FORM_KEY],
          register,
          isLoading,
          tabIndex: 1,
        }),
        passwordFieldAsProps({
          getError: () => errors[PASSWORD_FORM_KEY],
          register,
          showPassword,
          setShowPassword,
          isLoading,
          tabIndex: 2,
          rightElement: (
            <Button
              variant="link"
              colorScheme={brandColorScheme}
              onClick={(e) => {
                e.preventDefault()
                router.push("/forgot/password")
              }}
            >
              Забули пароль?
            </Button>
          ),
        }),
      ]}
    />
  )
}

export default LoginForm
