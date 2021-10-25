import { Image } from "@chakra-ui/image"
import { FunctionComponent } from "react"
import SwiperCore, { Navigation, Pagination, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Navigation, Pagination, A11y])

const Carousel: FunctionComponent<{ images: string[] }> = ({ images }) => (
  <Swiper
    navigation
    pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log("slide change")}
  >
    {images.map((imageUrl) => (
      <SwiperSlide>
        <Image src={imageUrl} alt="Post image" />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default Carousel
