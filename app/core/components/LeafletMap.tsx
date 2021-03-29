import { CSSProperties, FunctionComponent } from "react"
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useToast } from "@chakra-ui/toast"

interface Location {
  lat: number
  lng: number
  radius: number
}

interface EditProps {
  onChange?: (locations: Location[]) => void
}

interface Props {
  isEditable?: boolean
  style?: CSSProperties
  properties?: MapContainerProps
}

const EditControl = ({ onChange }: EditProps) => {
  // Helper constants
  const MAX_CIRCLES_COUNT = 10
  const CIRCLE_RADIUS = 200

  const toast = useToast()
  const featureGroup = new L.FeatureGroup()

  const showError = ({ message, title }: { message: string; title?: string }) => {
    toast({
      title: title || "Error placing circle",
      description: message,
      status: "error",
      isClosable: true,
    })
  }

  const saveChanges = (layers: L.Circle[]) => {
    // If onChange modifier exists
    if (onChange)
      // Run on change
      onChange(
        // Map layers to locations
        layers.map(
          (layer): Location => {
            return {
              ...layer.getLatLng(),
              radius: layer.getRadius(),
            }
          }
        )
      )
  }

  // Mapping events from map
  const map = useMapEvents({
    click: ({ latlng }) => {
      // Get all circles from group
      const featureLayers = featureGroup.getLayers() as L.Circle[]

      // If circles more than allowed - error
      if (featureLayers.length > MAX_CIRCLES_COUNT) {
        showError({ message: "You've reached limit of circles" })
      } else {
        // Checking if point lies in one of the circles
        const circlesPointed = featureLayers.filter(
          (layer) => latlng.distanceTo(layer.getLatLng()) < CIRCLE_RADIUS
        )

        // If there are circles, that contain this point
        if (circlesPointed.length > 0) {
          showError({ message: "There is already circle in this area" })
        } else {
          // Else add new circle to group
          featureGroup.addLayer(new L.Circle(latlng, { radius: CIRCLE_RADIUS }))
          saveChanges(featureGroup.getLayers() as L.Circle[])
        }
      }
    },
    contextmenu: ({ latlng }) => {
      // Get all circles from group
      const featureLayers = featureGroup.getLayers() as L.Circle[]

      // If there are any circles
      if (featureLayers.length > 0) {
        // Checking if point lies in one of the circles
        const circlesPointed = featureLayers.filter(
          (layer) => latlng.distanceTo(layer.getLatLng()) < CIRCLE_RADIUS
        )

        // If there are circles, that contain this point
        if (circlesPointed.length > 0) {
          circlesPointed.forEach((circle) => featureGroup.removeLayer(circle))
          saveChanges(featureGroup.getLayers() as L.Circle[])
        }
      }
    },
  })

  map.addLayer(featureGroup)

  return null
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
