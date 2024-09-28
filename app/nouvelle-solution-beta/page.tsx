"use client"

import { newSolution } from "@/lib/actions"
import { categories } from "@/lib/staticData"
import { LatLngTuple } from "leaflet"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { solutionDetailsPlaceHolder } from "@/lib/staticData"
import clsx from "clsx"

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
    null
  )
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<boolean>(false)

  const Map = useMemo(
    () =>
      dynamic(() => import("../ui/mapPicker"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  )

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log("file", file)

    if (file) {
      // Validate file size
      if (file.size > 1024 * 1024) {
        // 1MB
        setImageError("Le fichier doit faire moins de 1MB.")
        setImagePreview(null)
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Le fichier doit être une image")
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

    if (!imagePreview) {
      setImageError("Aucune photo chargée")
      window.alert("Aucune photo chargée")
      return
    }

    if (selectedLocation) {
      formData.append("latitude", selectedLocation[0].toString())
      formData.append("longitude", selectedLocation[1].toString())
    } else {
      setLocationError(true)
      window.alert("Aucune localisation sélectionnée")
      return
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
          required
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
        <div className="flex flex-wrap gap-4 justify-center my-4">
          <label
            htmlFor="file-input"
            className="cursor-pointer max-w-[450px] grow"
          >
            {!imagePreview && (
              <div className="flex flex-col h-[300px] items-center justify-center rounded-lg p-4 bg-slate-50 hover:bg-slate-200">
                <Image
                  src="/default_image.svg"
                  alt="Image Preview"
                  width={30}
                  height={30}
                  className="h-auto"
                />
                <p className="text-center text-gray-500 mt-2">
                  Ajouter une photo
                </p>
                {imageError && (
                  <p className="text-red-500 font-bold">{imageError}</p>
                )}
              </div>
            )}
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
          </label>
          <input
            id="file-input"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="rounded-lg shadow-md max-w-[450px] h-[300px] grow z-0">
            <p
              className={clsx(
                "text-center pb-1 font-bold",
                locationError ? "text-red-500" : "text-gray-500"
              )}
            >
              Sélectioner un lieu sur la carte
            </p>

            <Map onLocationSelect={setSelectedLocation} />

            <div className="p-4">
              <div className="flex gap-4">
                <Image
                  src={`/letter.svg`}
                  alt="Contact"
                  width={50}
                  height={50}
                />
                <p className="grow">
                  <textarea
                    name="contact"
                    className="border w-full"
                    placeholder="Contact de la solution (e-mail, téléphone, formulaire de contact, etc ...)"
                    autoComplete="off"
                  />
                </p>
              </div>
              <input
                name="website"
                type="url"
                className="mt-2 inline-block px-4 py-1 border-large border-blue-500 rounded-lg "
                placeholder="Adresse du site web"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <p className="my-4">
          <textarea
            name="details"
            className="border w-full h-96 lg:h-80"
            placeholder={solutionDetailsPlaceHolder}
            autoComplete="off"
          />
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
