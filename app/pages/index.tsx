import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import CustomMap from "app/core/components/CustomMap"
import MapPanel from "app/core/components/MapPanel"

const Home: BlitzPage = () => {
  return (
    <>
      {/* <CustomMap /> */}
      <MapPanel />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
