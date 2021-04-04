import "leaflet/dist/leaflet.css"
import { CSSProperties, FunctionComponent } from "react"
import { MapContainer, MapContainerProps, TileLayer, ZoomControl } from "react-leaflet"
import EditControl, { EditProps } from "./EditControl"
import ViewControl, { ViewMode, ViewSingleMode, ViewMultipleMode, ViewProps } from "./ViewControl"

export const EditMode = "edit" as const
export type MapMode = ViewMode | typeof EditMode

const mapComponent = (props: {
  [EditMode]?: EditProps
  [ViewSingleMode]: ViewProps
  [ViewMultipleMode]: ViewProps
}) => ({
  [EditMode]: <EditControl {...props?.[EditMode]} />,
  [ViewSingleMode]: <ViewControl {...props[ViewSingleMode]!} />,
  [ViewMultipleMode]: <ViewControl {...props[ViewMultipleMode]!} />,
})

interface Props {
  mode: MapMode
  style?: CSSProperties
  properties?: MapContainerProps
}

const LeafletMap: FunctionComponent<Props & EditProps> = ({
  mode,
  onChange,
  style = { display: "flex", flexGrow: 1 },
  properties = {
    center: [50.7472, 25.3254],
    zoom: 12,
    zoomControl: false,
    minZoom: 4,
  },
}) => (
  <MapContainer {...{ style, ...properties }}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <ZoomControl position="bottomright" />
    {
      mapComponent({
        [EditMode]: { onChange },
        [ViewSingleMode]: { mode: mode as ViewMode },
        [ViewMultipleMode]: { mode: mode as ViewMode },
      })[mode]
    }
  </MapContainer>
)

export default LeafletMap
