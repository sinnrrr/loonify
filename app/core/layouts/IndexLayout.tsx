import React, { Suspense } from "react"
import { invoke } from "blitz"
import Layout from "app/core/layouts/Layout"
import theme from "@chakra-ui/theme"
import getBoundedPosts from "app/posts/queries/getBoundedPosts"
import MapPanel from "../components/MapPanel"
import Map from "../components/Map"
import { LayoutProps } from "../layouts/Layout"

const IndexLayout = ({ children, title }: LayoutProps) => {
  return (
    <Layout title={title}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Layout>
  )
}

export default IndexLayout