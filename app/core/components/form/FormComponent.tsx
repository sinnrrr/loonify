import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { FunctionComponent, LegacyRef, ReactNode } from "react"
import { FieldError } from "react-hook-form"

export type FormComponentProps = {
  label: string
  helperText: string
  isRequired?: boolean
  children?: ReactNode
  getError: () => FieldError | undefined
  field?: {
    formKey: string
    placeholder: string
    autoComplete?: string
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
      <FormLabel>
        {label}
        {/* <Flex justify="space-between">
          <Text>{label}</Text>
          {field?.rightElement}
        </Flex> */}
      </FormLabel>
      {children ? (
        children
      ) : (
        <Input
          autoComplete={field!.autoComplete}
          name={field!.formKey}
          ref={field!.register}
          placeholder={field!.placeholder}
        />
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
