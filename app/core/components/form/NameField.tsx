import { FIRST_NAME_FORM_KEY, LAST_NAME_FORM_KEY } from "app/auth/constants"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { FormFieldProps } from "types"

export type NameFieldProps = FormFieldProps & {
  isLast?: boolean
}

export const nameFieldAsProps = ({
  getError,
  register,
  isLast = false,
  isLoading,
}: NameFieldProps): FormComponentProps => ({
  getError,
  isRequired: !!!isLast,
  label: isLast ? "Фамілія" : "Ім'я",
  helperText: isLast ? "Ваша фамілія" : "Ваше ім'я",
  field: {
    register,
    isLoading,
    formKey: isLast ? LAST_NAME_FORM_KEY : FIRST_NAME_FORM_KEY,
    placeholder: isLast ? "Введіть фамілію" : "Введіть ім'я",
    autoComplete: isLast ? "family-name" : "given-name",
  },
})

const NameField = ({ getError, register, isLast, isLoading }: NameFieldProps) => (
  <FormComponent
    {...nameFieldAsProps({
      getError,
      register,
      isLast,
      isLoading,
    })}
  />
)

export default NameField
