import React from "react"
import { BlitzPage, invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import Map from "../core/components/Map"
import theme from "@chakra-ui/theme"
import MapPanel from "../core/components/MapPanel"
import getBoundedPosts from "app/posts/queries/getBoundedPosts"

const Home: BlitzPage = () => {
  return (
    <>
      <MapPanel />
      <Map
        fetcher={(bounds) => invoke(getBoundedPosts, bounds)}
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
