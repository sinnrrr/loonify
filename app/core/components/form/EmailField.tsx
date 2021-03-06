import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { FormFieldProps } from "types"
import { EMAIL_FORM_KEY } from "../../../auth/constants"

export type EmailFieldProps = FormFieldProps

export const emailFieldAsProps = ({
  getError,
  register,
  isLoading,
  tabIndex = 0,
}: EmailFieldProps): FormComponentProps => ({
  getError,
  isRequired: true,
  label: "Емейл",
  helperText: "Електронна поштова скринька",
  field: {
    register,
    isLoading,
    tabIndex,
    formKey: EMAIL_FORM_KEY,
    placeholder: "Пошта",
    autoComplete: "email",
  },
})

const EmailField = ({ getError, register, isLoading, tabIndex }: EmailFieldProps) => (
  <FormComponent
    {...emailFieldAsProps({
      getError,
      register,
      isLoading,
      tabIndex,
    })}
  />
)

export default EmailField
