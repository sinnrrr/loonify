import { CSSProperties, FunctionComponent } from "react"
import { MapContainer, MapContainerProps, TileLayer, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import EditControl, { EditProps } from "./EditControl"

interface Props {
  isEditable?: boolean
  style?: CSSProperties
  properties?: MapContainerProps
}

const LeafletMap: FunctionComponent<Props & EditProps> = ({
  onChange,
  isEditable = false,
  style = { display: "flex", flexGrow: 1 },
  properties = {
    center: [50.7472, 25.3254],
    zoom: 12,
    zoomControl: false,
    minZoom: 4,
  },
}) => {
  return (
    <MapContainer {...{ style, ...properties }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {isEditable && <EditControl {...{ onChange }} />}
    </MapContainer>
  )
}

export default LeafletMap
