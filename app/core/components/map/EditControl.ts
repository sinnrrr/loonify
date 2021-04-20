import L from "leaflet"
import { useToast } from "@chakra-ui/toast"
import { useMapEvents } from "react-leaflet"

export interface CircleLocation {
  lat: number
  lng: number
  radius: number
}

export interface EditProps {
  onChange?: (locations: CircleLocation[]) => void
}

const EditControl = ({ onChange }: EditProps) => {
  // Helper constants
  const MAX_LAYERS_COUNT = 10
  const CIRCLE_RADIUS = 200

  const toast = useToast()
  const featureGroup = new L.LayerGroup()

  const showError = ({ message, title }: { message: string; title?: string }) => {
    toast({
      title: title || "Error placing circle",
      description: message,
      status: "error",
      duration: 2000,
    })
  }

  const saveChanges = (layers: L.Circle[]) => {
    // If onChange modifier exists
    if (onChange)
      // Run on change
      onChange(
        // Map layers to locations
        layers.map(
          (layer): CircleLocation => ({
            ...layer.getLatLng(),
            radius: layer.getRadius(),
          })
        )
      )
  }

  // Mapping events from map
  const map = useMapEvents({
    click: ({ latlng }) => {
      // Get all layers from group
      const featureLayers = featureGroup.getLayers() as L.Circle[]

      // If layers more than allowed - error
      if (featureLayers.length > MAX_LAYERS_COUNT) {
        showError({ message: "You've reached limit of circles" })
      } else {
        // Checking if point lies in one of the layers
        const layersPointed = featureLayers.filter(
          (layer) => latlng.distanceTo(layer.getLatLng()) < layer.getRadius()
        )

        // If there are layers, that contain this point
        if (layersPointed.length > 0) {
          showError({ message: "There is already circle in this area" })
        } else {
          // Else add new layer to group
          featureGroup.addLayer(new L.Circle(latlng, { radius: CIRCLE_RADIUS }))
          saveChanges(featureGroup.getLayers() as L.Circle[])
        }
      }
    },
    contextmenu: ({ latlng }) => {
      // Get all layers from group
      const featureLayers = featureGroup.getLayers() as L.Circle[]

      // If there are any layers
      if (featureLayers.length > 0) {
        // Checking if point lies in one of the layers
        const layersPointed = featureLayers.filter(
          (layer) => latlng.distanceTo(layer.getLatLng()) < layer.getRadius()
        )

        // If there are layers, that contain this point
        if (layersPointed.length > 0) {
          layersPointed.forEach((layer) => featureGroup.removeLayer(layer))
          saveChanges(featureGroup.getLayers() as L.Circle[])
        }
      }
    },
  })

  map.addLayer(featureGroup)

  return null
}

export default EditControl
