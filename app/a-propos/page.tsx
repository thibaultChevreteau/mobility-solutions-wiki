"use client"

import { faqData } from "@/lib/staticData"
import { useState } from "react"

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">À propos</p>
      <ul className="mt-4">
        {faqData.map((item, index) => (
          <li key={index} className="mb-4">
            <div
              className="cursor-pointer font-medium"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{item.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
