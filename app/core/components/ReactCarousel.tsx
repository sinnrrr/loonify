import { FunctionComponent } from "react"
import Carousel from "@brainhubeu/react-carousel"
import { Image } from "@chakra-ui/image"
import { Box, Flex } from "@chakra-ui/layout"
import "@brainhubeu/react-carousel/lib/style.css"

const ReactCarousel: FunctionComponent<{ images: string[] }> = ({ images }) => {
  return (
    <Flex>
      <Carousel plugins={["arrows"]}>
        {images.map((image, index) => (
          <Image key={index} src={image} alt={"Image " + index} />
        ))}
      </Carousel>
    </Flex>
  )
}

export default ReactCarousel
