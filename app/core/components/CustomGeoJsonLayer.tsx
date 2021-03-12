import { GeoJSON } from "geojson"
import { FunctionComponent } from "react"
import { GeoJSONLayer } from "react-mapbox-gl"

const defaultGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [59.0625, 63.074865690586634],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [25.37039279937744, 50.74677503642915],
            [25.382795333862305, 50.74677503642915],
            [25.382795333862305, 50.75424196621602],
            [25.37039279937744, 50.75424196621602],
            [25.37039279937744, 50.74677503642915],
          ],
        ],
      },
    },
  ],
}

const geoJsonStyles = {
  lineLayout: {
    "line-join": "round",
    "line-cap": "round",
  },
  linePaint: {
    "line-color": "#ff11ff",
    "line-width": 4,
    "line-opacity": 1,
  },
  symbolLayout: {
    "text-field": "{text}",
    "symbol-placement": "line",
    "text-rotation-alignment": "map",
    "text-size": {
      base: 1,
      stops: [
        [9, 9],
        [14, 12],
      ],
    },
  },
  symbolPaint: {
    "text-color": "rgba(0, 0, 0, 1)",
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 2,
  },
}

interface Props {
  data?: GeoJSON
}

const CustomGeoJsonLayer: FunctionComponent<Props> = ({ data = defaultGeoJson }) => {
  return <GeoJSONLayer {...geoJsonStyles} data={data}></GeoJSONLayer>
}

export default CustomGeoJsonLayer