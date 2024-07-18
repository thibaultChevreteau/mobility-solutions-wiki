import Link from "next/link"

import { useMemo } from "react"
import dynamic from "next/dynamic"

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("../app/ui/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )
  return (
    <div className="font-sans px-6 overflow-hidden mt-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 px-6 md:px-20 text-xl">
          <h1 className="text-3xl font-bold mb-5">
            Les solutions de mobilité dans les Pyrénées{" "}
          </h1>
          <p>
            Ce wiki collaboratif vise à recenser et présenter les solutions de
            mobilité innovantes et durables dans les Pyrénées et au delà.
          </p>
          <div className="mt-10">
            <Link
              href="/solutions"
              className="rounded-full bg-blue-500 text-white p-4"
            >
              Parcourir les solutions
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-80 rounded-lg overflow-hidden mt-10 md:mt-0">
          <Map />
        </div>
      </div>
    </div>
  )
}
