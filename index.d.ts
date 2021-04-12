declare module "*.module.scss" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.module.css" {
  const content: { [className: string]: string }
  export default content
}

declare module "react-leaflet-draw" {
  import { FunctionComponent } from "react"
  import type {
    PolylineOptions,
    MarkerOptions,
    CircleMarkerOptions,
    ControlPosition,
  } from "leaflet"

  interface EditControlProps {
    onEdited?: Function
    onDrawStart?: Function
    onDrawStop?: Function
    onDrawVertex?: Function
    onEditStart?: Function
    onEditMove?: Function
    onEditResize?: Function
    onEditVertex?: Function
    onEditStop?: Function
    onDeleted?: Function
    onDeleteStart?: Function
    onDeleteStop?: Function

    onCreated?: Function
    onMounted?: Function
    draw: {
      polyline?: PolylineOptions | boolean
      polygon?: PolylineOptions | boolean
      rectangle?: PolylineOptions | boolean
      circle?: CircleMarkerOptions | boolean
      marker?: MarkerOptions | boolean
      circlemarker?: CircleMarkerOptions | boolean
    }

    position: ControlPosition
  }

  export const EditControl: FunctionComponent<EditControlProps>
}

declare module "react-leaflet-markercluster" {
  import { Component } from "react"

  export default class MarkerClusterGroup extends Component {}
}
