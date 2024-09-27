"use client"

import { newSolution } from "@/lib/actions"
import { categories } from "@/lib/staticData"
import { LatLngTuple } from "leaflet"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
    null
  )

  const Map = useMemo(
    () =>
      dynamic(() => import("../ui/mapPicker"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (selectedLocation) {
      formData.append("latitude", selectedLocation[0].toString())
      formData.append("longitude", selectedLocation[1].toString())
    }

    try {
      await newSolution(formData)
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-4 font-heading">
        <select
          name="category"
          defaultValue=""
          className="border-b bg-inherit mb-2 text-sm text-gray-400"
        >
          <option value="" disabled hidden>
            Sélectioner une catégorie
          </option>
          {categories.map(category => (
            <option key={category.name} value={category.name.toUpperCase()}>
              {category.name.toUpperCase()}
            </option>
          ))}
        </select>
        <h1>
          <input
            name="name"
            type="text"
            className="border-b text-2xl font-bold"
            placeholder="Nom de la solution"
          />
        </h1>
        <p>
          <input
            name="description"
            type="text"
            className="border-b"
            placeholder="Description de la solution"
          />
        </p>
        <input name="image" type="file" />
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
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
