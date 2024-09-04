//modify tooltip without using nextui ?
"use client"

import { fetchSolutionCardData } from "@/lib/data"
import Image from "next/image"
import { Tooltip } from "@nextui-org/tooltip"
import { useEffect, useState } from "react"
import { categories, Solution } from "@/lib/definitions"
import Switch from "@/ui/switch"
import MultiSelect from "@/ui/multiSelect"
import { log } from "console"

const options = categories.map(category => ({
  label: category.name,
  value: category.name,
}))

export default function Page() {
  const [solutionsCardData, setSolutionsCardData] = useState<Solution[]>([])
  const [localOnly, setLocalOnly] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/solutions/overview")
        const data = await response.json()
        setSolutionsCardData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleToggle = () => {
    setLocalOnly(!localOnly)
  }

  const handleCategoryChange = (selected: string[]) => {
    setSelectedCategories(selected)
  }

  const filteredSolutions = solutionsCardData.filter(cardData => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        selectedCategory =>
          selectedCategory.toLowerCase() === cardData.category.toLowerCase()
      )

    const matchesLocal = !localOnly || cardData.isLocal

    return matchesCategory && matchesLocal
  })

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-5 mt-16">
        Solutions de mobilité
      </h1>
      <p className="text-center text-gray-600 mb-10 mx-4">
        Catalogue de solutions durables pour les habitants des Pyrénées
      </p>
      <div className="flex text-gray-600 justify-center items-center border-y-2 mb-2 py-2 gap-10">
        <div className="flex">
          <p className="text-sm mx-2">Solutions locales</p>
          <Switch isOn={localOnly} handleToggle={handleToggle} />
        </div>
        <MultiSelect
          options={options}
          value={selectedCategories}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto">
        {filteredSolutions.map(cardData => {
          if (localOnly && !cardData.isLocal) {
            return null
          }
          return (
            <div
              key={cardData.id}
              className="relative mb-4 max-w-[20rem] rounded-lg shadow-md"
            >
              <Image
                src={cardData.imgurl}
                alt={cardData.name}
                width={500}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4 pb-2 mb-2">
                <p className="mb-2 text-sm text-gray-400">
                  {cardData.category}
                </p>
                <h2 className="font-bold text-lg mb-2">{cardData.name}</h2>
                <p className="text-base">{cardData.description}</p>
              </div>
              {cardData.isLocal && (
                <div className="absolute -bottom-2.5 -right-2.5 z-10">
                  <Tooltip
                    content="Solution locale"
                    className="bg-white border-gray-400 border-1 rounded-full px-1 text-sm"
                    placement={"left-end"}
                  >
                    <Image
                      src="/pyreneesmobilite_logo.svg"
                      alt="Pyrenees Mobilite Logo"
                      width={50}
                      height={50}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
