"use client"

import Switch from "@/ui/switch"
import { useState } from "react"

export default function Page() {
  const [isOn, setIsOn] = useState(false)

  const handleToggle = () => {
    setIsOn(prevState => !prevState)
  }

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">À propos</p>
      <Switch isOn={isOn} handleToggle={handleToggle} />
    </div>
  )
}
