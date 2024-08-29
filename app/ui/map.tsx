"use client"

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import React, { useEffect, useState } from "react"

// Define a new type that includes the name
type SolutionLocation = {
  latitude: string
  longitude: string
  name: string
}

const Map: React.FC = () => {
  const [locations, setLocations] = useState<
    { position: [number, number]; name: string }[]
  >([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/solution-locations")
        const data: SolutionLocation[] = await response.json()

        // Convert locations to number and filter out invalid ones
        const validLocations = data
          .map(({ latitude, longitude, name }) => {
            const lat = parseFloat(latitude)
            const lon = parseFloat(longitude)
            // Validate latitude and longitude ranges
            if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
              return { position: [lat, lon] as [number, number], name }
            }
            return null
          })
          .filter(
            (loc): loc is { position: [number, number]; name: string } =>
              loc !== null
          )

        setLocations(validLocations)
      } catch (error) {
        console.error("Error fetching coordinates:", error)
      }
    }

    fetchLocations()
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
        {locations.map(({ position, name }, index) => (
          <Marker key={index} position={position}>
            <Popup>{name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map
