import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { FunctionComponent, useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { BiDownload, BiImages } from "react-icons/bi"
import { Box, Flex, HStack, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { useRequest } from "app/core/hooks/useRequest"
import { UploadApiResponse } from "app/api/v0/images"
import { MAX_FORM_IMAGES } from "../constants"
import Icon from "@chakra-ui/icon"
import { Image } from "@chakra-ui/image"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

const UploadBlock: FunctionComponent<{
  onStart: () => void
  onFinish: (images: string[]) => void
}> = ({ onStart, onFinish }) => {
  const uploadImageRequest = useRequest("images")

  // States
  const [items, setItems] = useState<number[]>(Array.from(Array(MAX_FORM_IMAGES).keys()))
  const [images, setImages] = useState<ImageListType>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  // On image has uploaded
  const onImagesChange = async (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // If image(s) is(are) unique
    if (addUpdateIndex) {
      // Callback
      onStart()

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

          // Callback
          onFinish(unioned)
        })
    }

    // Set images list for library
    setImages(imageList)
  }

  const onDragEnd = (result: DropResult) => {
    // If out of zone or want to get over empty fields
    if (
      !result.destination ||
      // Length of way
      Math.abs(result.destination.index - result.source.index) >=
        // Images uploaded
        images.length
    )
      return

    const list = items

    const [removed] = list.splice(result.source.index, 1)
    list.splice(result.destination.index, 0, removed)

    setItems(list)
  }

  return (
    <FormControl>
      <ImageUploading multiple value={images} onChange={onImagesChange} maxNumber={MAX_FORM_IMAGES}>
        {({
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            <FormLabel>
              <Flex justify="space-between">
                <Text>Image</Text>
                {!!images.length && (
                  <Button size="xs" onClick={onImageRemoveAll}>
                    Clear all
                  </Button>
                )}
              </Flex>
            </FormLabel>
            <Box overflowX="auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided) => (
                    <HStack
                      align="stretch"
                      grow={1}
                      mb={theme.space[2]}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {items.map((element, index) => (
                        <Draggable
                          key={"item-" + element}
                          draggableId={"item-" + element}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Flex
                              grow={1}
                              cursor="pointer"
                              p={theme.space[2]}
                              justify="center"
                              align="center"
                              onClick={onImageUpload}
                              aria-label="Add image"
                              minW={theme.sizes[48]}
                              border={theme.borders["1px"]}
                              borderRadius={theme.radii.lg}
                              borderColor={theme.colors.gray[200]}
                              borderStyle="dashed"
                              ref={provided.innerRef}
                              {...dragProps}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              {...(snapshot.isDragging && { bgColor: theme.colors.gray[100] })}
                            >
                              {!!images.length && images[element] ? (
                                <Image src={images[element].dataURL} alt={"Image " + element} />
                              ) : (
                                <Icon
                                  m={theme.space[10]}
                                  h={theme.sizes[12]}
                                  w={theme.sizes[12]}
                                  as={isDragging ? BiDownload : BiImages}
                                />
                              )}
                            </Flex>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </HStack>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            <FormHelperText>Posts with image get a 50% more visitors</FormHelperText>
          </>
        )}
      </ImageUploading>
    </FormControl>
  )
}

export default UploadBlock
