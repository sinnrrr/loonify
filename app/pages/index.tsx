import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Map from "app/map/components/Map"
import theme from "@chakra-ui/theme"
import MapPanel from "app/map/components/MapPanel"

const Home: BlitzPage = () => {
  return (
    <>
      <MapPanel />
      <Map
        mode="multiple"
        style={{
          zIndex: theme.zIndices.base,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
