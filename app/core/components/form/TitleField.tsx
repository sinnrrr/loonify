import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { TITLE_FORM_KEY } from "app/posts/constants"
import { FormFieldProps } from "types"

export type TitleFieldProps = FormFieldProps

export const titleFieldAsProps = ({
  getError,
  register,
  isLoading,
  tabIndex = 0,
}: TitleFieldProps): FormComponentProps => ({
  isRequired: true,
  label: "Заголовок оголошення",
  getError,
  helperText: "Придумайте короткий та зрозумілий заголовок",
  field: { formKey: TITLE_FORM_KEY, register, placeholder: "Заголовок", isLoading, tabIndex },
})

const TitleField = ({ getError, register, isLoading, tabIndex }: TitleFieldProps) => (
  <FormComponent
    {...titleFieldAsProps({
      getError,
      register,
      isLoading,
      tabIndex,
    })}
  />
)

export default TitleField
