import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = (selectedValue: string) => {
    const newSelectedItems = value.includes(selectedValue)
      ? value.filter(item => item !== selectedValue)
      : [...value, selectedValue]
    onChange(newSelectedItems)
  }

  const handleUnselectAll = () => {
    onChange([]) // Unselect all options
    setIsOpen(false) // Close the dropdown after unselecting all
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
          {value.length > 0 && (
            <span className="ml-2 bg-blue-500 text-white rounded-md px-1 py-0">
              {value.length}
            </span>
          )}
        </div>
        <Image
          src="down-arrow.svg"
          alt="down arrow"
          className="ml-2"
          width={10}
          height={10}
        />
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-1 bg-white rounded max-h-80 overflow-y-auto shadow-lg min-w-max">
          {value.length > 0 && (
            <li
              className="flex justify-center items-center p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
              onClick={handleUnselectAll}
            >
              -- Toutes --
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
                checked={value.includes(option.value)}
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
