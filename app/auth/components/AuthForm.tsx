import { Box, Container, VStack } from "@chakra-ui/layout"
import { Button, chakra, Image, Link, theme } from "@chakra-ui/react"
import { FormEventHandler, FunctionComponent, ReactNode } from "react"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import NextLink from "next/link"

export type AuthFormProps = {
  isValid: boolean
  isLoading: boolean
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
}) => (
  <Container h="100vh" maxW={theme.sizes.md}>
    <VStack h="100%" spacing={12} justify="center">
      <Box>
        <Link as={NextLink} href="/office">
          <Image cursor="pointer" src="/logo.svg" />
        </Link>
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

export default AuthForm
