import { Textarea } from "@chakra-ui/textarea"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { DESCRIPTION_FORM_KEY } from "app/posts/constants"
import { LegacyRef } from "react"
import { FormFieldProps } from "types"

export type DescriptionFieldProps = FormFieldProps & { register: LegacyRef<HTMLTextAreaElement> }

export const descriptionFieldAsProps = ({
  getError,
  register,
  isLoading,
}: DescriptionFieldProps): FormComponentProps => ({
  isRequired: true,
  label: "Детальний опис",
  getError,
  helperText: "Складіть гарний опис, щоб залучити більше відвідувачів",
  children: (
    <Textarea
      rows={8}
      ref={register}
      placeholder="Опис"
      name={DESCRIPTION_FORM_KEY}
      isDisabled={isLoading}
    />
  ),
})

const DescriptionField = ({ getError, register, isLoading }: DescriptionFieldProps) => (
  <FormComponent
    {...descriptionFieldAsProps({
      getError,
      register,
      isLoading,
    })}
  />
)

export default DescriptionField
