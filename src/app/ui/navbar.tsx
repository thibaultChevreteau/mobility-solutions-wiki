"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
  { path: "/works", text: "Works" },
]

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  const currentPath = usePathname()

  return (
    <>
      {links.map(link => (
        <Link
          key={link.path}
          className={
            currentPath === link.path ? "text-gray-900 font-semibold" : ""
          }
          href={link.path}
          onClick={toggleMenu}
        >
          {link.text}
        </Link>
      ))}
    </>
  )
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full max-w-2xl m-auto bg-white">
      <div className="border-b-2">
        <nav className="px-6 h-16 flex items-center gap-4">
          <Link className="flex items-center mr-auto" href="/">
            <Image
              src="logo_thibault.svg"
              width={0}
              height={0}
              alt="Company logo"
              className="w-6 h-auto"
            />
            <span className="px-1 font-sans font-medium">
              thibaultChevreteau
            </span>
          </Link>

          {/* Conditionally render NavLink elements before GitHub icon for larger screens */}
          <div className="hidden md:flex gap-4">
            <NavLinks toggleMenu={toggleMenu} />
          </div>

          <Link
            className="md:order-last"
            href="https://github.com/username"
            target="_blank"
          >
            <Image
              src="github-mark.svg"
              width={0}
              height={0}
              alt="Github logo"
              className="w-6 h-auto"
            />
          </Link>

          {/* Menu button for mobile view */}
          <div className="md:hidden flex items-center">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                onClick={toggleMenu}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                onClick={toggleMenu}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="no-doc-scroll h-full px-6 mt-4 flex flex-col items-start gap-4 min-h-screen font-sans font-medium text-gray-500 md:hidden">
          <NavLinks toggleMenu={toggleMenu} />
        </div>
      )}
    </div>
  )
}
