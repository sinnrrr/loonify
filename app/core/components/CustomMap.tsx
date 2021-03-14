import ReactMapboxGl from "react-mapbox-gl"
import { FunctionComponent } from "react"
import { Props as MapProps } from "react-mapbox-gl/lib/map"
import { GeoJSON } from "geojson"
import theme from "@chakra-ui/theme"
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
      zIndex: theme.zIndices.base,
      position: "absolute",
      height: "100vh",
      width: "100vw",
    },
  },
  geoJson,
}) => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic2lubnJyciIsImEiOiJja2xkb211ZW0wc21qMnZtanhvMzV0NWk2In0.8Si-C483o7t3XoUhN8Wpxg",
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
