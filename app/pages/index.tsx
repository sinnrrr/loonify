import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ReactMapboxGl from "react-mapbox-gl"
import { Props as MapProps } from "react-mapbox-gl/lib/map"
import CustomGeoJsonLayer from "app/core/components/CustomGeoJsonLayer"
import { Box, Heading } from "@chakra-ui/layout"
import { Input } from "@chakra-ui/input"
import theme from "@chakra-ui/theme"

const Home: BlitzPage = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic2lubnJyciIsImEiOiJja2xkb211ZW0wc21qMnZtanhvMzV0NWk2In0.8Si-C483o7t3XoUhN8Wpxg",
    attributionControl: false,
  })

  const mapProperties: MapProps = {
    style: "mapbox://styles/mapbox/streets-v11",
    center: [25.2989856, 50.7397857],
    containerStyle: {
      zIndex: theme.zIndices.base,
      position: "absolute",
      height: "100vh",
      width: "100vw",
    },
  }

  return (
    <>
      <Map {...mapProperties}>
        <CustomGeoJsonLayer />
      </Map>
      <Box zIndex={theme.zIndices.docked}>
        <Box bgColor="white" p="4" m="4" borderRadius="100">
          <Heading>Hello world</Heading>
          <Input placeholder="Search" />
        </Box>
      </Box>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
