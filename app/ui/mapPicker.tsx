"use client"

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import React, { useState } from "react"
import { LatLngTuple } from "leaflet"

const ClickableMap: React.FC<{
  setMarkerPosition: (pos: LatLngTuple) => void
}> = ({ setMarkerPosition }) => {
  useMapEvents({
    click(e) {
      const newLocation: LatLngTuple = [e.latlng.lat, e.latlng.lng]
      setMarkerPosition(newLocation)
      console.log("User selected location:", newLocation)
    },
  })
  return null
}

const SolutionMap: React.FC<{
  onLocationSelect: (location: LatLngTuple | null) => void
}> = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(null)
  const center: LatLngTuple = [42.9555, 0.2836]

  // Whenever the marker position changes, update the parent component
  const handleMarkerPosition = (position: LatLngTuple) => {
    setMarkerPosition(position)
    onLocationSelect(position) // Pass selected location to the parent
  }

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: "250px", width: "50%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap setMarkerPosition={handleMarkerPosition} />
      {markerPosition && <Marker position={markerPosition}></Marker>}
    </MapContainer>
  )
}

export default SolutionMap
