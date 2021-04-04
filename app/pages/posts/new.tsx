import { BlitzPage, useAuthenticatedSession, useMutation, useRouter } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "app/map/components/Map"
import Layout from "app/core/layouts/Layout"
import { DESCRIPTION_FORM_KEY, TITLE_FORM_KEY } from "app/posts/constants"
import { CreatePost } from "app/posts/validations"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import createPost from "app/posts/mutations/createPost"
import UploadBlock from "app/posts/components/UploadBlock"

const NewPostPage: BlitzPage = () => {
  // Mutations and requests
  const [createPostMutation] = useMutation(createPost)

  // States
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false)

  // Hooks
  const router = useRouter()
  const activeSession = useAuthenticatedSession()

  // Zod react hook form registering
  const {
    errors,
    register,
    trigger,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(CreatePost),
  })

  // Register fields without inputs
  useEffect(() => {
    register({ name: "ownerId", value: activeSession.userId })
  })

  // On form submit handler
  const submitForm = async () => {
    createPostMutation(getValues()).then(({ id: postId }) => router.push("/posts/" + postId))
  }

  // Set unregistered values and trigger validation
  const setUnregisteredValue = (key: string, value: unknown) => {
    setValue(key, value)
    trigger(key)
  }

  return (
    <Flex grow={1} justify="center">
      <Container p={theme.space[4]} m={theme.space[4]} maxW={theme.sizes.container.md}>
        <VStack spacing={theme.space[8]}>
          <Heading>Create new post</Heading>
          <FormControl isInvalid={!!errors[TITLE_FORM_KEY]} isRequired>
            <FormLabel>Title</FormLabel>
            <Input name={TITLE_FORM_KEY} ref={register} placeholder="Title" />
            {errors[TITLE_FORM_KEY]?.message ? (
              <FormErrorMessage>{errors[TITLE_FORM_KEY]?.message}</FormErrorMessage>
            ) : (
              <FormHelperText>We'll never share your email</FormHelperText>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors[DESCRIPTION_FORM_KEY]} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name={DESCRIPTION_FORM_KEY}
              ref={register}
              rows={8}
              placeholder="Description"
            />
            {errors[DESCRIPTION_FORM_KEY]?.message ? (
              <FormErrorMessage>{errors[DESCRIPTION_FORM_KEY]?.message}</FormErrorMessage>
            ) : (
              <FormHelperText>Make a beautiful description to attract more visitors</FormHelperText>
            )}
          </FormControl>
          <UploadBlock
            onStart={() => setIsUploadingImages(true)}
            onFinish={(images) => {
              setUnregisteredValue("images", images)
              setIsUploadingImages(false)
            }}
          />
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Map
              mode="edit"
              onChange={(layers) => setUnregisteredValue("locations", layers)}
              style={{ height: "30vh" }}
            />
            <FormHelperText>Make a beautiful description to attract more visitors</FormHelperText>
          </FormControl>
          <Button isFullWidth disabled={!isValid || isUploadingImages} onClick={submitForm}>
            Submit
          </Button>
        </VStack>
      </Container>
    </Flex>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => (
  <Layout title={"Create New Post"}>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </Layout>
)

export default NewPostPage
