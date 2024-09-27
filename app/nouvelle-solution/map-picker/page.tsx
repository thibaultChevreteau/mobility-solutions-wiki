"use client"

import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import { LatLngTuple } from "leaflet"

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
    null
  )

  const Map = useMemo(
    () =>
      dynamic(() => import("../../ui/mapPicker"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  )

  return (
    <div>
      <h1>Select a location on the map</h1>
      <Map onLocationSelect={setSelectedLocation} />
      {selectedLocation && (
        <p>
          Selected location: Latitude {selectedLocation[0]}, Longitude{" "}
          {selectedLocation[1]}
        </p>
      )}
    </div>
  )
}
