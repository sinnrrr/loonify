import ReactMapboxGl from "react-mapbox-gl"
import { CSSProperties, FunctionComponent, useState } from "react"
import { GeoJSON } from "geojson"
import CustomGeoJsonLayer from "./CustomGeoJsonLayer"
import { Flex } from "@chakra-ui/layout"
import ResizeObserver, { useResizeDetector } from "react-resize-detector"
import { Skeleton } from "@chakra-ui/skeleton"
import { Style } from "mapbox-gl"

interface Props {
  properties?: {
    style: string | Style
    center: [number, number]
  }
  containerStyle?: CSSProperties
  geoJson?: GeoJSON
}

const CustomMap: FunctionComponent<Props> = ({
  properties = {
    style: "mapbox://styles/mapbox/streets-v11",
    center: [25.2989856, 50.7397857],
  },
  containerStyle = {
    height: "100%",
    width: "100%",
  },
  geoJson,
}) => {
  const [isLoaded, setLoaded] = useState(false)

  const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY || "",
    attributionControl: false,
    trackResize: false,
  })

  const { ref } = useResizeDetector()

  return (
    <Flex grow={1}>
      <Map
        ref={ref}
        onRender={() => setLoaded(true)}
        containerStyle={containerStyle}
        {...properties}
      >
        <CustomGeoJsonLayer data={geoJson} />
      </Map>
      {/* <Box position="absolute" right="0" bottom="0" m="2">
          <Text>Loonify</Text>
        </Box> */}
    </Flex>
  )
}

export default CustomMap
