import Link from "next/link"
import React from "react"

interface NewSolutionButtonProps {
  toggleMenu?: () => void
}

const NewSolutionButton: React.FC<NewSolutionButtonProps> = ({
  toggleMenu,
}) => {
  return (
    <Link
      className="md:order-last inline-block px-4 py-2 font-body text-white bg-blue-500 rounded-lg hover:bg-blue-400"
      href="nouvelle-solution"
      onClick={toggleMenu}
    >
      Nouvelle solution
    </Link>
  )
}

export default NewSolutionButton
