import { BlitzPage, useAuthenticatedSession, useMutation } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Container, Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "../../../core/components/Map"
import Layout from "app/core/layouts/Layout"
import {
  ALLOWED_POST_TYPES,
  DESCRIPTION_FORM_KEY,
  TITLE_FORM_KEY,
  TYPE_FORM_KEY,
  CATEGORY_FORM_KEY,
} from "app/posts/constants"
import { CreatePost } from "app/posts/validations"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import createPost from "app/posts/mutations/createPost"
import UploadBlock from "app/posts/components/UploadBlock"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import { Select } from "@chakra-ui/select"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useBackRedirect } from "app/core/hooks/useBackRedirect"
import CategorySelectModal from "app/core/components/CategorySelectModal"
import { useDisclosure } from "@chakra-ui/hooks"
import { Category } from "db"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"

const NewPostPage: BlitzPage = () => {
  // Mutations and requests
  const [createPostMutation] = useMutation(createPost)

  // States
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false)

  // Hooks
  const backRedirect = useBackRedirect()
  const postRedirect = usePostRedirect()
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

  // On form submit handler
  const submitForm = async () => {
    createPostMutation(getValues()).then(({ id: postId }) => postRedirect(postId))
  }

  // Set unregistered values and trigger validation
  const setUnregisteredValue = (key: string, value: unknown) => {
    setValue(key, value)
    trigger(key)
  }

  // Register fields without inputs
  useEffect(() => {
    register({ name: "ownerId", value: activeSession.userId })
  })

  setInterval(() => console.log(getValues()), 3000)

  return (
    <Flex grow={1} justify="center">
      <Container p={theme.space[4]} m={theme.space[4]} maxW={theme.sizes.container.md}>
        <VStack spacing={theme.space[8]}>
          <HStack>
            <ArrowBackIcon w={10} h={10} cursor="pointer" onClick={backRedirect} />
            <Heading>Create new post</Heading>
          </HStack>
          <HStack w="100%">
            <FormControl isInvalid={!!errors[TYPE_FORM_KEY]} isRequired>
              <FormLabel>Type</FormLabel>
              <Select name={TYPE_FORM_KEY} ref={register}>
                {ALLOWED_POST_TYPES.map((type, index) => (
                  <option key={index} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </Select>
              {errors[TYPE_FORM_KEY]?.message ? (
                <FormErrorMessage>{errors[TYPE_FORM_KEY]?.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Choose type of post</FormHelperText>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors[CATEGORY_FORM_KEY]} isRequired>
              <FormLabel>Category</FormLabel>
              {selectedCategory ? (
                <Tag size="lg">
                  <TagLabel>{selectedCategory.name}</TagLabel>
                  <TagCloseButton onClick={() => setSelectedCategory(undefined)} />
                </Tag>
              ) : (
                <Button onClick={onOpen} isFullWidth>
                  Choose category
                </Button>
              )}
              <CategorySelectModal
                isOpen={isOpen}
                onClose={onClose}
                onFinish={(category) => {
                  setSelectedCategory(category)
                  setUnregisteredValue("categoryId", category.id)
                }}
              />
              {errors[CATEGORY_FORM_KEY]?.message ? (
                <FormErrorMessage>{errors[CATEGORY_FORM_KEY]?.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Category of post</FormHelperText>
              )}
            </FormControl>
          </HStack>
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
              onChange={(layers) => setUnregisteredValue("locations", layers)}
              style={{ height: "30vh" }}
            />
            <FormHelperText>
              Select location on map (simply click on it) or remove location by right-clicking or
              holding a tap on location
            </FormHelperText>
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
