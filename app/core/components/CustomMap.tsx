import ReactMapboxGl from "react-mapbox-gl"
import { CSSProperties, FunctionComponent, useState } from "react"
import { GeoJSON } from "geojson"
import CustomGeoJsonLayer from "./CustomGeoJsonLayer"
import { Box, Text } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/skeleton"
import { Style } from "mapbox-gl"

interface Props {
  properties?: {
    style: string | Style
    center: [number, number]
  }
  containerStyle?: CSSProperties
  skeletonStyle?: CSSProperties
  geoJson?: GeoJSON
}

const CustomMap: FunctionComponent<Props> = ({
  properties = {
    style: "mapbox://styles/mapbox/streets-v11",
    center: [25.2989856, 50.7397857],
  },
  containerStyle = {
    position: "absolute",
    height: "100vh",
    width: "100vw",
  },
  geoJson,
  skeletonStyle,
}) => {
  const [isLoaded, setLoaded] = useState(false)

  const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY || "",
    attributionControl: false,
    trackResize: false,
  })

  return (
    <Skeleton isLoaded={isLoaded} style={skeletonStyle ? skeletonStyle : containerStyle}>
      <Map
        onRender={() => setLoaded(true)}
        onResize={(a) => {
          console.log(a)
        }}
        containerStyle={containerStyle}
        {...properties}
      >
        <CustomGeoJsonLayer data={geoJson} />
      </Map>
      <Box position="absolute" right="0" bottom="0" m="2">
        <Text>Loonify</Text>
      </Box>
    </Skeleton>
  )
}

export default CustomMap
