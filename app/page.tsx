import Link from "next/link"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import { fetchCoordinates } from "./lib/data"

export async function Page() {
  const coordinates = await fetchCoordinates()
  console.log(coordinates)
  return <p>Coordinates</p>
}

export default function HomePage() {
  // const coordinates = await fetchCoordinates()
  // console.log(coordinates)

  const pyreneesCoordinates: [number, number][] = [
    [42.8327, -0.5652], // Gavarnie, France
    [42.7334, 0.6593], // Benasque, Spain
    [42.6594, 1.2953], // Andorra la Vella, Andorra
    [42.8126, 1.0697], // Soldeu, Andorra
    [42.7885, -0.051], // Luz-Saint-Sauveur, France
    [43.0258, 1.0196], // Saint-Lary-Soulan, France
    [42.5934, 1.3718], // Pas de la Casa, Andorra
    [42.7244, 0.5432], // Vielha, Spain
    [42.855, 1.4128], // La Molina, Spain
    [43.0865, 0.2714], // Cauterets, France
  ]

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
            Solutions de mobilité pour les habitants des Pyrénées
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
