import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Flex } from "@chakra-ui/layout"
import { FunctionComponent, LegacyRef, ReactNode } from "react"
import { FieldError } from "react-hook-form"
import { Loadable } from "types"

export type FormComponentProps = {
  label: string
  helperText: string
  isRequired?: boolean
  children?: ReactNode
  rightElement?: ReactNode
  getError: () => FieldError | undefined
  field?: Loadable & {
    formKey: string
    tabIndex?: number
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
  rightElement,
  isRequired = false,
}) => {
  return (
    <FormControl isInvalid={!!getError()} isRequired={isRequired}>
      <Flex justify="space-between">
        <FormLabel>{label}</FormLabel>
        {rightElement}
      </Flex>
      {children ? (
        children
      ) : (
        <Input
          tabIndex={field!.tabIndex || 0}
          isDisabled={field!.isLoading}
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
