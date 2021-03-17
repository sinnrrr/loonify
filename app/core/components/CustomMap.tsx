import ReactMapboxGl from "react-mapbox-gl"
import { FunctionComponent } from "react"
import { Props as MapProps } from "react-mapbox-gl/lib/map"
import { GeoJSON } from "geojson"
import CustomGeoJsonLayer from "./CustomGeoJsonLayer"
import { Box, Text } from "@chakra-ui/layout"

interface Props {
  properties?: MapProps
  geoJson?: GeoJSON
}

const CustomMap: FunctionComponent<Props> = ({
  properties = {
    style: "mapbox://styles/mapbox/streets-v11",
    center: [25.2989856, 50.7397857],
    containerStyle: {
      position: "absolute",
      height: "100vh",
      width: "100vw",
    },
  },
  geoJson,
}) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY || "",
    attributionControl: false,
  })

  return (
    <>
      <Map {...properties}>
        <CustomGeoJsonLayer data={geoJson} />
      </Map>
      <Box position="absolute" right="0" bottom="0" m="2">
        <Text>Loonify</Text>
      </Box>
    </>
  )
}

export default CustomMap
