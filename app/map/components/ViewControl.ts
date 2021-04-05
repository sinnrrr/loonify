import { LeafletEventHandlerFnMap } from "leaflet"
import { FunctionComponent } from "react"
import { useMapEvents } from "react-leaflet"
import { CircleLocation } from "./EditControl"
import { Querier } from "./LeafletMap"

const data = new Set<CircleLocation[]>()

export const handleDataUpdate = (upcoming: CircleLocation[]) => {
  data.add(upcoming)
}

export const fetchMultipleLocations = () => {
  console.log("MULTIPLE")
}

// Possible mode variants
export const ViewSingleMode = "single" as const
export const ViewMultipleMode = "multiple" as const

// Union view mode type
export type ViewMode = typeof ViewSingleMode | typeof ViewMultipleMode

// Handlers mapper for mode variants
export const handlerFunction = {
  [ViewMultipleMode]: fetchMultipleLocations,
}

// Event mapper, which uses handler mapper to handle map events
export const eventHandlers: { [key in ViewMode]?: LeafletEventHandlerFnMap } = {
  [ViewMultipleMode]: { moveend: handlerFunction[ViewMultipleMode] },
}

export type ViewProps = { mode: ViewMode; querier: Querier }

const ViewControl: FunctionComponent<ViewProps> = ({ mode, querier }) => {
  // Calling handler for given mode
  querier().then((upcoming) => handleDataUpdate(upcoming))

  // Using event mapper to handle events
  useMapEvents(eventHandlers[mode] || {})

  return null
}

export default ViewControl
