//review the whole component

"use client"

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import React, { useEffect, useState } from "react"

type Coordinate = {
  latitude: string
  longitude: string
}

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number][]>([])

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch("/api/coordinates")
        const data: Coordinate[] = await response.json()

        // Convert coordinates to number and filter out invalid ones
        const validCoordinates = data
          .map(({ latitude, longitude }) => {
            const lat = parseFloat(latitude)
            const lon = parseFloat(longitude)
            // Validate latitude and longitude ranges
            if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
              return [lat, lon] as [number, number]
            }
            return null
          })
          .filter((coord): coord is [number, number] => coord !== null)

        setCoordinates(validCoordinates)
      } catch (error) {
        console.error("Error fetching coordinates:", error)
      }
    }

    fetchCoordinates()
  }, [])

  return (
    <MapContainer
      center={[42.9555, 0.2836]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup maxClusterRadius={25}>
        {coordinates.map((coord, index) => (
          <Marker key={index} position={coord}>
            <Popup>Tarbes</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map
