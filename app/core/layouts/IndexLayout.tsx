import React from "react"
import { invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import theme from "@chakra-ui/theme"
import getBoundedPosts from "app/posts/queries/getBoundedPosts"
import MapPanel from "../components/layout/MapPanel"
import Map from "../components/map/Map"
import { LayoutProps } from "../layouts/Layout"

const IndexLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <MapPanel>{children}</MapPanel>
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
    </Layout>
  )
}

export default IndexLayout
