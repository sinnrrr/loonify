import { Select } from "@chakra-ui/select"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { ALLOWED_POST_TYPES, postTypeToName, TYPE_FORM_KEY } from "app/posts/constants"
import { LegacyRef } from "react"
import { FormFieldProps } from "types"

export type TypeFieldProps = FormFieldProps & { register: LegacyRef<HTMLSelectElement> }

export const typeFieldAsProps = ({
  getError,
  register,
  isLoading,
}: TypeFieldProps): FormComponentProps => ({
  getError,
  isRequired: true,
  label: "Тип",
  helperText: "Оберіть тип оголошення",
  children: (
    <Select name={TYPE_FORM_KEY} ref={register} isDisabled={isLoading}>
      {ALLOWED_POST_TYPES.map((type, index) => (
        <option key={index} value={type}>
          {postTypeToName[type]}
        </option>
      ))}
    </Select>
  ),
})

const TypeField = ({ getError, register, isLoading }: TypeFieldProps) => (
  <FormComponent
    {...typeFieldAsProps({
      getError,
      register,
      isLoading,
    })}
  />
)

export default TypeField
