import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ReactMapboxGl from "react-mapbox-gl"
import { Props as MapProps } from "react-mapbox-gl/lib/map"
import CustomGeoJsonLayer from "app/core/components/CustomGeoJsonLayer"

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
      display: 'flex',
      flexGrow: 1,
    },
  }

  return (
    <Map {...mapProperties}>
      <CustomGeoJsonLayer />
    </Map>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
