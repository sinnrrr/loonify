import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import MapPanel from "app/core/components/MapPanel"
import Map from "app/core/components/Map"
import theme from "@chakra-ui/theme"

const Home: BlitzPage = () => {
  return (
    <>
      <MapPanel />
      <Map
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
