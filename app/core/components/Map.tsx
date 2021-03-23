import dynamic from "next/dynamic"

const Map = dynamic(() => import("../components/LeafletMap"), { ssr: false })

export default Map
