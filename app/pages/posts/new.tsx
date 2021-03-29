import { BlitzPage, useAuthenticatedSession, useMutation, useRouter } from "@blitzjs/core"
import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { Input } from "@chakra-ui/input"
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "app/core/components/Map"
import Layout from "app/core/layouts/Layout"
import { DESCRIPTION_FORM_KEY, TITLE_FORM_KEY, MAX_FORM_IMAGES } from "app/posts/constants"
import { CreatePost } from "app/posts/validations"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BiImages } from "react-icons/bi"
import { useRequest } from "app/core/hooks/useRequest"
import createPost from "app/posts/mutations/createPost"
import { UploadApiResponse } from "app/api/v0/images"

const NewPostPage: BlitzPage = () => {
  // Mutations and requests
  const [createPostMutation] = useMutation(createPost)
  const uploadImageRequest = useRequest("images")

  // States
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false)
  const [images, setImages] = useState<ImageListType>([])

  // Hooks
  const router = useRouter()
  const activeSession = useAuthenticatedSession()

  // Zod react hook form registering
  const {
    errors,
    register,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreatePost),
  })

  // Register fields without inputs
  useEffect(() => {
    register({ name: "ownerId", value: activeSession.userId })
    register({ name: "images", value: [] as string[] })
  })

  // On image has uploaded
  const onImagesChange = async (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // If image(s) is(are) unique
    if (addUpdateIndex) {
      setIsUploadingImages(true)

      const formData = new FormData()

      // Append unique image(s) to form data
      addUpdateIndex.forEach((index) => formData.append("images", imageList[index].file!))

      // Send api request
      uploadImageRequest({
        method: "post",
        body: formData,
      })
        // Convert readable stream to json
        .then((response) => response.json())
        // Push image URL(s) to array
        .then((data: UploadApiResponse[]) => {
          // Caught image URL(s) from response
          const urls: string[] = data.map((response) => response.url)
          // Merged current and caught URL(s)
          const unioned = [...uploadedImages, ...urls]

          // Setting state for library
          setUploadedImages(unioned)
          // Setting state for form parsing
          setValue("images", unioned)
          // Setting state for progress
          setIsUploadingImages(false)
        })
    }

    // Set images list for library
    setImages(imageList)
  }

  // On form submit handler
  const submitForm = async () => {
    createPostMutation(getValues()).then(({ id: postId }) => router.push("/posts/" + postId))
  }

  return (
    <Flex grow={1} justify="center">
      <Container
        p={theme.space[4]}
        m={theme.space[4]}
        borderRadius={theme.radii.lg}
        border={theme.borders["1px"]}
        borderColor={theme.colors.gray[200]}
        borderStyle="dashed"
        maxW={theme.sizes.container.md}
      >
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
          <FormControl>
            <FormLabel>Image</FormLabel>
            <ImageUploading
              multiple
              value={images}
              onChange={onImagesChange}
              maxNumber={MAX_FORM_IMAGES}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <Flex overflowX="auto">
                  <Button
                    onClick={onImageUpload}
                    {...dragProps}
                    aria-label="Add image"
                    m={theme.space[1]}
                    p={theme.space[12]}
                  >
                    <BiImages size={theme.sizes[12]} />
                  </Button>
                  {JSON.stringify(imageList)}
                </Flex>
                //   <button onClick={onImageRemoveAll}>Remove all images</button>
                //   {imageList.map((image, index) => (
                //     <div key={index} className="image-item">
                //       <img src={image.dataURL} alt="" width="100" />
                //       <div className="image-item__btn-wrapper">
                //         <button onClick={() => onImageUpdate(index)}>Update</button>
                //         <button onClick={() => onImageRemove(index)}>Remove</button>
                //       </div>
                //     </div>
                //   ))}
              )}
            </ImageUploading>
            <FormHelperText>Posts with image get a 50% more visitors</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Map style={{ height: "30vh" }} />
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
