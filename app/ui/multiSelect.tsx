"use client"

import Image from "next/image"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const categoriesQuery = searchParams.get("categories")
  const selectedValues = categoriesQuery ? categoriesQuery.split(",") : []

  const handleToggle = (selectedValue: string) => {
    const newSelectedItems = selectedValues.includes(selectedValue)
      ? selectedValues.filter(item => item !== selectedValue)
      : [...selectedValues, selectedValue]

    const params = new URLSearchParams(searchParams)
    if (newSelectedItems.length > 0) {
      params.set("categories", newSelectedItems.join(","))
    } else {
      params.delete("categories")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleUnselectAll = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("categories")

    replace(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="p-2 rounded cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <span>Catégories</span>
          {selectedValues.length > 0 && (
            <span className="ml-2 bg-blue-500 text-white rounded-md px-1 py-0">
              {selectedValues.length}
            </span>
          )}
        </div>
        <Image
          src="/down-arrow.svg"
          alt="down arrow"
          className="ml-2"
          width={10}
          height={10}
        />
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-1 bg-white rounded max-h-80 overflow-y-auto shadow-lg min-w-max">
          {selectedValues.length > 0 && (
            <li
              className="flex justify-center italic items-center p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
              onClick={handleUnselectAll}
            >
              -- Réinitialiser --
            </li>
          )}
          {options.map(option => (
            <li
              key={option.value}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
              onClick={() => handleToggle(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="mr-2"
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MultiSelect
