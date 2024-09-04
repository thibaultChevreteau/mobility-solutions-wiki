"use client"

import MultiSelect from "@/ui/multiSelect"
import Switch from "@/ui/switch"
import { useState } from "react"

interface Option {
  label: string
  value: string
}

export default function Page() {
  const [isOn, setIsOn] = useState(false)

  const handleToggle = () => {
    setIsOn(prevState => !prevState)
  }

  const options: Option[] = [
    { label: "OptionVeryLong 1", value: "option1" },
    { label: "OptionVeryLong 2", value: "option2" },
    { label: "OptionVeryLong 3", value: "option3" },
    { label: "OptionVeryLong 4", value: "option4" },
  ]

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">À propos</p>
      <Switch isOn={isOn} handleToggle={handleToggle} />
      <div>
        <h1 className="text-2xl font-semibold mb-4">MultiSelect Component</h1>
      </div>
    </div>
  )
}
