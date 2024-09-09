"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Switch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // Function to handle the switch toggle
  function handleSwitch() {
    // Determine current state based on URL parameters
    const isOn = searchParams.has("solutions")

    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams)

    if (isOn) {
      // If currently on, turn it off
      params.delete("solutions")
    } else {
      // If currently off, turn it on
      params.set("solutions", "locales")
    }

    // Update the URL
    replace(`${pathname}?${params.toString()}`)
  }

  // Determine initial state based on URL parameters
  const isOn = searchParams.has("solutions")

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          checked={isOn}
          onChange={handleSwitch}
          className="sr-only"
        />
        <div
          className={`w-8 h-5 flex items-center cursor-pointer rounded-full ${
            isOn ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={handleSwitch}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
              isOn ? "translate-x-3.5" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
