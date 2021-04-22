import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { TITLE_FORM_KEY } from "app/posts/constants"
import { FormFieldProps } from "types"

export type TitleFieldProps = FormFieldProps

export const titleFieldAsProps = ({
  getError,
  register,
  isLoading,
}: TitleFieldProps): FormComponentProps => ({
  isRequired: true,
  label: "Заголовок оголошення",
  getError,
  helperText: "Придумайте короткий та зрозумілий заголовок",
  field: { formKey: TITLE_FORM_KEY, register, placeholder: "Заголовок", isLoading },
})

const TitleField = ({ getError, register, isLoading }: TitleFieldProps) => (
  <FormComponent
    {...titleFieldAsProps({
      getError,
      register,
      isLoading,
    })}
  />
)

export default TitleField
