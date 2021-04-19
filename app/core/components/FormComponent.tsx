import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { FunctionComponent, LegacyRef } from "react"
import { FieldError } from "react-hook-form"

export type FormComponentProps = {
  label: string
  helperText: string
  isRequired?: boolean
  getError: () => FieldError | undefined
  field?: {
    formKey: string
    placeholder: string
    register: LegacyRef<HTMLInputElement> | undefined
  }
}

const FormComponent: FunctionComponent<FormComponentProps> = ({
  children,
  getError,
  field,
  label,
  helperText,
  isRequired = false,
}) => {
  return (
    <FormControl isInvalid={!!getError()} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {children ? (
        children
      ) : (
        <Input name={field!.formKey} ref={field!.register} placeholder={field!.placeholder} />
      )}
      {getError() ? (
        <FormErrorMessage>{getError()?.message}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default FormComponent
