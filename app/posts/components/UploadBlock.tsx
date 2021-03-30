import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { FunctionComponent, useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { BiImages } from "react-icons/bi"
import { Flex } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import theme from "@chakra-ui/theme"
import { useRequest } from "app/core/hooks/useRequest"
import { UploadApiResponse } from "app/api/v0/images"
import { MAX_FORM_IMAGES } from "../constants"

const UploadBlock: FunctionComponent<{
  onStart: () => void
  onFinish: (images: string[]) => void
}> = ({ onStart, onFinish }) => {
  const uploadImageRequest = useRequest("images")

  // States
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [images, setImages] = useState<ImageListType>([])

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

  return (
    <FormControl>
      <FormLabel>Image</FormLabel>
      <ImageUploading multiple value={images} onChange={onImagesChange} maxNumber={MAX_FORM_IMAGES}>
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
  )
}

export default UploadBlock
