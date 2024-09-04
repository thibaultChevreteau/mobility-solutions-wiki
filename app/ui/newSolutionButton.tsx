import Link from "next/link"
import React from "react"

const NewSolutionButton = () => {
  return (
    <Link
      className="md:order-last inline-block px-4 py-2 font-body text-white bg-blue-500 rounded-lg hover:bg-blue-400"
      href="nouvelle-solution"
    >
      Nouvelle solution
    </Link>
  )
}

export default NewSolutionButton
