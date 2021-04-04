import { LeafletEventHandlerFnMap } from "leaflet"
import { FunctionComponent } from "react"
import { useMapEvents } from "react-leaflet"

export const fetchMultipleLocations = () => {
  console.log("MULTIPLE")
}

export const fetchSingleLocation = () => {
  console.log("SINGLE")
}

// Possible mode variants
export const ViewSingleMode = "single" as const
export const ViewMultipleMode = "multiple" as const

// Union view mode type
export type ViewMode = typeof ViewSingleMode | typeof ViewMultipleMode

// Handlers mapper for mode variants
export const handlerFunction = {
  [ViewSingleMode]: fetchSingleLocation,
  [ViewMultipleMode]: fetchMultipleLocations,
}

// Event mapper, which uses handler mapper to handle map events
export const eventHandlers: { [key in ViewMode]?: LeafletEventHandlerFnMap } = {
  [ViewMultipleMode]: { moveend: handlerFunction[ViewMultipleMode] },
}

export type ViewProps = { mode: ViewMode }

const ViewControl: FunctionComponent<ViewProps> = ({ mode }) => {
  // Calling handler for given mode
  handlerFunction[mode]()

  // Using event mapper to handle events
  useMapEvents(eventHandlers[mode] || {})

  return null
}

export default ViewControl
