import { Box, Heading, Text } from "@chakra-ui/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Link, useColorModeValue } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { useForm } from "react-hook-form"
import { Signup } from "../validations"
import {
  EMAIL_FORM_KEY,
  FIRST_NAME_FORM_KEY,
  LAST_NAME_FORM_KEY,
  PASSWORD_FORM_KEY,
} from "../constants"
import AuthForm from "./AuthForm"
import { useMutation, useRouter } from "@blitzjs/core"
import { passwordFieldAsProps } from "app/core/components/form/PasswordField"
import signup from "../mutations/signup"
import { emailFieldAsProps } from "app/core/components/form/EmailField"
import { SubmittableFormProps } from "types"
import NextLink from "next/link"
import { nameFieldAsProps } from "app/core/components/form/NameField"

const SignupForm: FunctionComponent<SubmittableFormProps> = ({ onSuccess }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [signupMutation] = useMutation(signup)

  const { errors, register, getValues } = useForm({
    mode: "onChange",
    resolver: zodResolver(Signup),
  })

  return (
    <AuthForm
      onSubmit={(e) => {
        e.preventDefault()
        signupMutation(getValues()).then(onSuccess)
      }}
      headerChild={
        <Box textAlign="center">
          <Heading>Створити новий аккаунт</Heading>
          <Text>
            Вже маєте аккаунт?{" "}
            <Button
              variant="link"
              color={useColorModeValue("purple.600", "yellow.400")}
              onClick={() => router.push("/login")}
            >
              Увійти
            </Button>
          </Text>
        </Box>
      }
      submitText="Зареєструватись"
      formFields={[
        nameFieldAsProps({ getError: () => errors[FIRST_NAME_FORM_KEY], register }),
        // nameFieldAsProps({ getError: () => errors[LAST_NAME_FORM_KEY], register, isLast: true }),
        emailFieldAsProps({ getError: () => errors[EMAIL_FORM_KEY], register }),
        passwordFieldAsProps({
          register,
          showPassword,
          setShowPassword,
          passwordIsNew: true,
          getError: () => errors[PASSWORD_FORM_KEY],
        }),
        passwordFieldAsProps({
          register,
          showPassword,
          setShowPassword,
          confirmal: true,
          getError: () => errors[PASSWORD_FORM_KEY],
        }),
      ]}
    />
  )
}

export default SignupForm
