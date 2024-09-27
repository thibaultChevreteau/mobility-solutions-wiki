"use client"

import { newSolution } from "@/lib/actions"
import { categories } from "@/lib/staticData"
import { LatLngTuple } from "leaflet"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import Image from "next/image"

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
    null
  )
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  const Map = useMemo(
    () =>
      dynamic(() => import("../ui/mapPicker"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  )

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size
      if (file.size > 1024 * 1024) {
        // 1MB
        setImageError("File size must be less than 1MB.")
        setImagePreview(null)
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("File must be an image.")
        setImagePreview(null)
        return
      }

      // If valid, create a preview
      setImageError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
          className="border-b bg-inherit mb-2 text-sm text-gray-400 focus:outline-none"
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
            className="border-b focus:outline-none focus:border-b-2 focus:border-black text-2xl font-bold w-full"
            placeholder="Nom de la solution"
            autoComplete="off"
            required
          />
        </h1>
        <p>
          <input
            name="description"
            type="text"
            className="border-b focus:outline-none focus:border-b-2 text-gray-600 w-full"
            placeholder="Description de la solution"
            autoComplete="off"
            required
          />
        </p>
        <label htmlFor="file-input" className="cursor-pointer">
          <Image
            src={imagePreview || "/default_image.svg"}
            alt="Image Preview"
            width={400}
            height={300}
            className="max-w-xs h-auto"
          />
        </label>

        <input
          id="file-input"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="hidden"
        />

        {imageError && <p className="text-red-500">{imageError}</p>}
        {imagePreview && (
          <div>
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={400}
              height={300}
              className="max-w-xs h-auto"
            />
          </div>
        )}
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
        <p>
          <input
            name="website"
            type="url"
            className="border-b"
            placeholder="Site web de la solution"
            autoComplete="off"
          />
        </p>
        <p>
          <input
            name="contact"
            type="text"
            className="border-b"
            placeholder="Contact de la solution"
            autoComplete="off"
          />
        </p>
        <p>
          <input
            name="details"
            type="text"
            className="border-b"
            placeholder="Détails supplémentaires"
            autoComplete="off"
          />
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
