"use client"

import { MapContainer, Marker, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import React from "react"
import { LatLngTuple } from "leaflet"

const SolutionMap: React.FC<{ location: LatLngTuple }> = ({ location }) => {
  return (
    <MapContainer
      center={location}
      zoom={7}
      style={{ height: "165px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location}></Marker>
    </MapContainer>
  )
}

export default SolutionMap
