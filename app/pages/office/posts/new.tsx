import { Button } from "@chakra-ui/button"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Container, Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import CategoryField from "app/core/components/form/CategoryField"
import DescriptionField from "app/core/components/form/DescriptionField"
import LocationField from "app/core/components/form/LocationField"
import TitleField from "app/core/components/form/TitleField"
import TypeField from "app/core/components/form/TypeField"
import { useBackRedirect } from "app/core/hooks/useBackRedirect"
import { useBrandColor } from "app/core/hooks/useBrandColor"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import Layout from "app/core/layouts/Layout"
import UploadBlock from "app/posts/components/UploadBlock"
import {
  CATEGORY_FORM_KEY,
  DESCRIPTION_FORM_KEY,
  IMAGES_FORM_KEY,
  LOCATIONS_FORM_KEY,
  TITLE_FORM_KEY,
  TYPE_FORM_KEY,
} from "app/posts/constants"
import createPost from "app/posts/mutations/createPost"
import { CreatePost } from "app/posts/validations"
import { BlitzPage, useAuthenticatedSession, useMutation } from "blitz"
import { NextSeo } from "next-seo"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const NewPostPage: BlitzPage = () => {
  // Mutations and requests
  const [createPostMutation, { isLoading }] = useMutation(createPost)

  // States
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

  return (
    <>
      <NextSeo
        title={"Створити оголошення | Loonify"}
        description={"Створити оголошення на сучасному бюро знахідок"}
        canonical={window.location.href && window.location.href}
        openGraph={{
          url: window.location.href && window.location.href,
          title: "Створити оголошення | Loonify",
          description: "Створити оголошення на сучасному бюро знахідок",
          site_name: "Loonify",
        }}
      />
      <Flex grow={1} justify="center">
        <Container p={theme.space[4]} m={theme.space[4]} maxW={theme.sizes.container.md}>
          <VStack spacing={theme.space[8]}>
            <HStack>
              <ArrowBackIcon w={10} h={10} cursor="pointer" onClick={backRedirect} />
              <Heading>Створити нове оголошення</Heading>
            </HStack>
            <HStack w="100%">
              <TypeField
                isLoading={isLoading}
                getError={() => errors[TYPE_FORM_KEY]}
                register={register}
              />
              <CategoryField
                isLoading={isLoading}
                getError={() => errors[CATEGORY_FORM_KEY]}
                onFinish={(category) => setUnregisteredValue(CATEGORY_FORM_KEY, category.id)}
              />
            </HStack>
            <TitleField
              isLoading={isLoading}
              register={register}
              getError={() => errors[TITLE_FORM_KEY]}
            />
            <DescriptionField
              isLoading={isLoading}
              register={register}
              getError={() => errors[DESCRIPTION_FORM_KEY]}
            />
            <LocationField
              onChange={(layers) => setUnregisteredValue(LOCATIONS_FORM_KEY, layers)}
            />
            <UploadBlock
              onStart={() => setIsUploadingImages(true)}
              onFinish={(images) => {
                setUnregisteredValue(IMAGES_FORM_KEY, images)
                setIsUploadingImages(false)
              }}
            />
            <Button
              isFullWidth
              colorScheme={useBrandColor(true)}
              isLoading={isLoading}
              disabled={!isValid || isUploadingImages}
              onClick={submitForm}
            >
              Створити
            </Button>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewPostPage
