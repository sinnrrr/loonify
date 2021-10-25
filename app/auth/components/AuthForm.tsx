import { Box, Container, VStack } from "@chakra-ui/layout"
import { Button, chakra, theme } from "@chakra-ui/react"
import { FormEventHandler, FunctionComponent, ReactNode } from "react"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { Loadable } from "types"
import Logo from "app/core/components/images/Logo"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"

export type AuthFormProps = Loadable & {
  isValid: boolean
  submitText: string
  headerChild: ReactNode
  formFields: FormComponentProps[]
  onSubmit: FormEventHandler<HTMLFormElement>
}

const AuthForm: FunctionComponent<AuthFormProps> = ({
  isValid,
  children,
  onSubmit,
  isLoading,
  formFields,
  submitText,
  headerChild,
}) => {
  const indexRedirect = useIndexRedirect()
  const brandColorScheme = useBrandColor(true)

  return (
    <Container h="100vh" maxW={theme.sizes.md}>
      <VStack h="100%" spacing={12} justify="center">
        <Box cursor="pointer" onClick={indexRedirect}>
          <Logo />
        </Box>
        {headerChild}
        <chakra.form onSubmit={onSubmit} w="100%">
          <VStack w="100%" spacing={8}>
            {children ? (
              children
            ) : (
              <>
                {formFields.map((props: FormComponentProps, index: number) => (
                  <FormComponent key={index} {...props} />
                ))}
                <Button
                  size="lg"
                  colorScheme={brandColorScheme}
                  isLoading={isLoading}
                  isDisabled={!isValid}
                  isFullWidth
                  type="submit"
                >
                  {submitText}
                </Button>
              </>
            )}
          </VStack>
        </chakra.form>
      </VStack>
    </Container>
  )
}

export default AuthForm
