import dynamic from "next/dynamic"

const Carousel = dynamic(() => import("../components/ReactCarousel"), { ssr: false })

export default Carousel
