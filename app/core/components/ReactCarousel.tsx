import "@brainhubeu/react-carousel/lib/style.css"
import { FunctionComponent } from "react"
import Carousel, { arrowsPlugin } from "@brainhubeu/react-carousel"
import { Image } from "@chakra-ui/image"
import { Button } from "@chakra-ui/button"

const ReactCarousel: FunctionComponent<{ images: string[] }> = ({ images }) => {
  return (
    <Carousel
      plugins={["arrows", "autoplay"]}
      // plugins={[
      //   {
      //     resolve: arrowsPlugin,
      //     options: {
      //       arrowLeft: <Button>L</Button>,
      //       arrowLeftDisabled: <Button>asd</Button>,
      //       arrowRight: <Button>R</Button>,
      //       arrowRightDisabled: <Button>asdasdasd</Button>,
      //       addArrowClickHandler: true,
      //     },
      //   },
      // ]}
    >
      {images.map((image, index) => (
        <Image key={index} src={image} alt={"Image " + index} />
      ))}
    </Carousel>
  )
}

export default ReactCarousel
