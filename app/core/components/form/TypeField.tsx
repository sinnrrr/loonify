import { Select } from "@chakra-ui/select"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { ALLOWED_POST_TYPES, TYPE_FORM_KEY } from "app/posts/constants"
import { LegacyRef } from "react"
import { FormFieldProps } from "types"

export type TypeFieldProps = FormFieldProps & { register: LegacyRef<HTMLSelectElement> }

export const typeFieldAsProps = ({ getError, register }: TypeFieldProps): FormComponentProps => ({
  getError,
  isRequired: true,
  label: "Тип",
  helperText: "Оберіть тип оголошення",
  children: (
    <Select name={TYPE_FORM_KEY} ref={register}>
      {ALLOWED_POST_TYPES.map((type, index) => (
        <option key={index} value={type}>
          {type.charAt(0) + type.slice(1).toLowerCase()}
        </option>
      ))}
    </Select>
  ),
})

const TypeField = ({ getError, register }: TypeFieldProps) => (
  <FormComponent
    {...typeFieldAsProps({
      getError,
      register,
    })}
  />
)

export default TypeField
