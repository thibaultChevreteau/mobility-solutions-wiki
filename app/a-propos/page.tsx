"use client"

import { faqData } from "@/lib/staticData"
import Image from "next/image"
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
          <li key={index} className="mb-4 text-gray-600">
            <div
              onClick={() => toggleAccordion(index)}
              className="flex cursor-pointer border-b py-2"
            >
              <div
                className={`font-medium flex-grow ${
                  openIndex === index ? "text-black" : ""
                }`}
              >
                {item.question}
              </div>
              <Image
                src="/down-arrow.svg"
                alt="Down arrow"
                width={10}
                height={10}
                className={` ml-2 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && <p className="mt-2">{item.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
