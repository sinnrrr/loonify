import { BlitzPage, useAuthenticatedSession, useMutation } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { Container, Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "../../../core/components/Map"
import Layout from "app/core/layouts/Layout"
import { CreatePost } from "app/posts/validations"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import createPost from "app/posts/mutations/createPost"
import UploadBlock from "app/posts/components/UploadBlock"
import { usePostRedirect } from "app/core/hooks/usePostRedirect"
import { Select } from "@chakra-ui/select"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useBackRedirect } from "app/core/hooks/useBackRedirect"
import { useDisclosure } from "@chakra-ui/hooks"
import { Category } from "db"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"
import {
  ALLOWED_POST_TYPES,
  CATEGORY_FORM_KEY,
  DESCRIPTION_FORM_KEY,
  LOCATION_FORM_KEY,
  TITLE_FORM_KEY,
  TYPE_FORM_KEY,
} from "app/posts/constants"
import FormComponent from "app/core/components/FormComponent"
import dynamic from "next/dynamic"
import { NextSeo } from "next-seo"

// Required, because without this map causes initialization error
const CategorySelectModal = dynamic(() => import("app/core/components/CategorySelectModal"))

const NewPostPage: BlitzPage = () => {
  // Mutations and requests
  const [createPostMutation, { isLoading: postIsCreating }] = useMutation(createPost)

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
              <FormComponent
                isRequired
                getError={() => errors[TYPE_FORM_KEY]}
                label="Тип"
                helperText="Оберіть тип оголошення"
              >
                <Select name={TYPE_FORM_KEY} ref={register}>
                  {ALLOWED_POST_TYPES.map((type, index) => (
                    <option key={index} value={type}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </option>
                  ))}
                </Select>
              </FormComponent>
              <FormComponent
                isRequired
                getError={() => errors[CATEGORY_FORM_KEY]}
                label="Категорія"
                helperText="Категорії оголошень забезпечують швидкий пошук"
              >
                {selectedCategory ? (
                  <Tag size="lg">
                    <TagLabel>{selectedCategory.name}</TagLabel>
                    <TagCloseButton onClick={() => setSelectedCategory(undefined)} />
                  </Tag>
                ) : (
                  <Button onClick={onOpen} isFullWidth>
                    Оберіть категорію
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
              </FormComponent>
            </HStack>
            <FormComponent
              isRequired
              label="Заголовок оголошення"
              getError={() => errors[TITLE_FORM_KEY]}
              helperText="Придумайте короткий та зрозумілий заголовок"
              field={{ formKey: TITLE_FORM_KEY, register, placeholder: "Заголовок" }}
            />
            <FormComponent
              isRequired
              label="Детальний опис"
              getError={() => errors[DESCRIPTION_FORM_KEY]}
              helperText="Складіть гарний опис, щоб залучити більше відвідувачів"
            >
              <Textarea rows={8} ref={register} placeholder="Опис" name={DESCRIPTION_FORM_KEY} />
            </FormComponent>
            <UploadBlock
              onStart={() => setIsUploadingImages(true)}
              onFinish={(images) => {
                setUnregisteredValue("images", images)
                setIsUploadingImages(false)
              }}
            />
            <FormComponent
              isRequired
              label="Місцезнаходження"
              helperText="Виберіть місце на карті (просто клацніть на карті) або видаліть маркер, клацнувши правою кнопкою миші або тримаючи палець на маркері"
              getError={() => errors[LOCATION_FORM_KEY]}
            >
              <Map
                onChange={(layers) => setUnregisteredValue("locations", layers)}
                style={{ height: "30vh" }}
              />
            </FormComponent>
            <Button
              isFullWidth
              isLoading={postIsCreating}
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
NewPostPage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </Layout>
)

export default NewPostPage
