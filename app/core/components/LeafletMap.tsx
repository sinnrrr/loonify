import { CSSProperties, FunctionComponent } from "react"
import { MapContainer, MapContainerProps, TileLayer, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface Props {
  style?: CSSProperties
  properties?: MapContainerProps
}

const LeafletMap: FunctionComponent<Props> = ({
  style = { display: "flex", flexGrow: 1 },
  properties = {
    center: [0, 0],
    zoom: 4,
    zoomControl: false,
  },
}) => {
  return (
    <MapContainer {...{ style, ...properties }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
    </MapContainer>
  )
}

export default LeafletMap
