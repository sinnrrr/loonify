import { Box, Container, VStack } from "@chakra-ui/layout"
import { Button, chakra, Image, Link, theme } from "@chakra-ui/react"
import { FormEventHandler, FunctionComponent, ReactNode } from "react"
import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import NextLink from "next/link"

export type AuthFormProps = {
  submitText: string
  headerChild: ReactNode
  formFields: FormComponentProps[]
  onSubmit: FormEventHandler<HTMLFormElement>
}

const AuthForm: FunctionComponent<AuthFormProps> = ({
  headerChild,
  formFields,
  submitText,
  onSubmit,
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
          {formFields.map((props, index) => (
            <FormComponent key={index} {...props} />
          ))}
          <Button size="lg" isFullWidth type="submit">
            {submitText}
          </Button>
        </VStack>
      </chakra.form>
    </VStack>
  </Container>
)

export default AuthForm
