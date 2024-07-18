"use client"

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const Map = () => {
  const position: [number, number] = [43.2326, 0.0832] // Coordinates of Tarbes, France

  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Tarbes</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
