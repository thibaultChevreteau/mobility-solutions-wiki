"use client"
import { LatLngTuple } from "leaflet"
import dynamic from "next/dynamic"
import { useMemo } from "react"

export default function MapLoader({ location }: { location: LatLngTuple }) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/ui/solutionMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )

  return <Map location={location} />
}
