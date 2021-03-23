import * as z from "zod"

const email = z.string().min(6).max(64).email()
const password = z.string().min(6).max(64)

export const Signup = z.object({
  email: email.nonempty(),
  password: password.nonempty(),
  name: z.string().nonempty(),
  phone: z.string(),
})

export const Login = z.object({
  email: email.nonempty(),
  password: password.nonempty(),
})

export const ForgotPassword = z.object({
  email: email.nonempty(),
})

export const ResetPassword = z
  .object({
    password,
    passwordConfirmation: password,
    token: z.string().nonempty(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: password,
  newPassword: password,
})
