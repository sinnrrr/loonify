import "leaflet/dist/leaflet.css"
import "react-leaflet-markercluster/dist/styles.min.css"
import { CSSProperties, FunctionComponent } from "react"
import {
  Circle,
  MapContainer,
  MapContainerProps,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet"
import EditControl, { CircleLocation, EditProps } from "./EditControl"
import { GetBoundedPosts } from "../../posts/queries/getBoundedPosts"
import * as z from "zod"
import { Post } from "db"
import { LatLngBounds } from "leaflet"
import { useList } from "react-use"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { usePostRedirect } from "../hooks/usePostRedirect"

export type Fetcher = (bounds: z.infer<typeof GetBoundedPosts>) => Promise<Post[]>

interface Props {
  isStatic?: boolean
  fetcher?: Fetcher
  style?: CSSProperties
  initial?: Post[]
  properties?: MapContainerProps
}

const LeafletMap: FunctionComponent<Props & EditProps> = ({
  fetcher,
  onChange,
  isStatic = false,
  style = { display: "flex", flexGrow: 1 },
  properties = {
    center: [50.7472, 25.3254],
    zoom: 12,
    zoomControl: false,
    minZoom: 4,
  },
}) => {
  const postRedirect = usePostRedirect()
  const [locations, { updateAt: updateLocation }] = useList<CircleLocation>()

  const handleBoundedPostsUpdate = (incoming: Post[]) => {
    incoming.forEach((post) =>
      post.locations.forEach((location: unknown) => {
        updateLocation(post.id, location as CircleLocation)
      })
    )
  }

  const fetchBoundedPosts = (mapBounds: LatLngBounds) => {
    if (fetcher) {
      fetcher({
        east: mapBounds.getEast(),
        west: mapBounds.getWest(),
        north: mapBounds.getNorth(),
        south: mapBounds.getSouth(),
      }).then((incoming) => handleBoundedPostsUpdate(incoming))
    }
  }

  // if (initial) handleBoundedPostsUpdate(initial)

  const Fetcher = () => {
    useMapEvents({
      // TODO
      // moveend: fetcher
      //   ? ({ target: map }: { target: LMap }) => fetchBoundedPosts(map.getBounds())
      //   : () => {},
    })

    return null
  }

  return (
    <MapContainer
      {...{ style, ...properties }}
      whenCreated={(map) => fetchBoundedPosts(map.getBounds())}
    >
      <Fetcher />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isStatic && <ZoomControl position="bottomright" />}
      {onChange && <EditControl onChange={onChange} />}
      {locations.length > 0 && (
        <MarkerClusterGroup>
          {locations.map((location, index) => (
            <Circle
              key={`circle-${index}`}
              radius={location.radius}
              center={[location.lat, location.lng]}
              eventHandlers={{ click: () => postRedirect(index, "quick") }}
            />
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  )
}

export default LeafletMap
