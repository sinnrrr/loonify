import { BlitzPage } from "@blitzjs/core"
import { Button, IconButton } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { DownloadIcon } from "@chakra-ui/icons"
import { Input } from "@chakra-ui/input"
import { Box, Container, Flex, Heading, Text, VStack, Wrap, WrapItem } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import theme from "@chakra-ui/theme"
import { useToast } from "@chakra-ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Map from "app/core/components/Map"
import Layout from "app/core/layouts/Layout"
import { DESCRIPTION_FORM_KEY, TITLE_FORM_KEY } from "app/posts/constants"
import { CreatePost } from "app/posts/validations"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import Icon from "@chakra-ui/icon"
import { BiImageAdd } from "react-icons/bi"

const NewPostPage: BlitzPage = () => {
  // Zod react hook form registering
  const { errors, register, getValues } = useForm({
    mode: "onBlur",
    resolver: zodResolver(CreatePost),
  })

  // Dropzone registering
  const { getRootProps, getInputProps } = useDropzone({ multiple: false })

  const toast = useToast()

  const submitForm = () => {
    if (errors) {
      console.log("Successful")
    } else {
      toast({
        title: "Error submitting form",
        description: "Some of fields in form has errors",
        status: "error",
        isClosable: true,
      })
    }
  }

  const [images, setImages] = useState([])
  const maxNumber = 69

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList as never[])
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
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <Button aria-label="Add image" p={theme.space[12]}>
                  <BiImageAdd size={theme.sizes[12]} />
                </Button>

                // <>
                //   <button
                //     style={isDragging ? { color: "red" } : undefined}
                //     onClick={onImageUpload}
                //     {...dragProps}
                //   >
                //     Click or Drop here
                //   </button>
                //   &nbsp;
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
                // </>
              )}
            </ImageUploading>
            {/* <Button
              cursor="pointer"
              isFullWidth
              {...getRootProps()}
              py={theme.space[16]}
              border={theme.borders["1px"]}
              borderColor={theme.colors.gray[200]}
              borderRadius={theme.radii.lg}
              aria-label="upload images"
            >
              <input {...getInputProps()} />
              <Flex direction="column" align="center">
                <VStack>
                  <DownloadIcon fontSize={theme.fontSizes.lg} />
                  <Text>Upload image</Text>
                </VStack>
              </Flex>
            </Button> */}
            <FormHelperText>Posts with image get a 50% more visitors</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Map style={{ height: "30vh" }} />
            <FormHelperText>Make a beautiful description to attract more visitors</FormHelperText>
          </FormControl>
          <Button isFullWidth onClick={submitForm}>
            Submit
          </Button>
        </VStack>
      </Container>
    </Flex>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
