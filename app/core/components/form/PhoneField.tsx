import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { FormFieldProps } from "types"
import { PHONE_FORM_KEY } from "app/auth/constants"

export type PhoneFieldProps = FormFieldProps

export const phoneFieldAsProps = ({
  getError,
  register,
  isLoading,
}: PhoneFieldProps): FormComponentProps => ({
  isRequired: true,
  label: "Телефон",
  getError,
  helperText: "Мобільний телефон",
  field: {
    formKey: PHONE_FORM_KEY,
    register,
    isLoading,
    placeholder: "Введіть ваш телефон",
    autoComplete: "tel",
  },
})

const PhoneField = ({ getError, register, isLoading }: PhoneFieldProps) => (
  <FormComponent
    {...phoneFieldAsProps({
      getError,
      register,
      isLoading,
    })}
  />
)

export default PhoneField
