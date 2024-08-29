//import switch from a propos
//modify tooltip without using nextui ?

import { fetchSolutionCardDataRDS } from "@/lib/data"
import Image from "next/image"
import { Tooltip } from "@nextui-org/tooltip"

const pyreneesPolygon: [number, number][] = [
  [43.81587270305823, -1.7816068109607344],
  [43.325004104008386, 0.12968726385829804],
  [43.03429988630792, 1.6224671723866744],
  [42.846840289300026, 3.3509492754749224],
  [41.8970711332641, 3.4467046638360386],
  [42.44605478246113, 0.011188027224996892],
  [42.76985792722391, -1.8072704992870186],
  [43.47097428016845, -2.393870064846836],
]

const isPointInPolygon = (
  point: [number, number],
  polygon: [number, number][]
): boolean => {
  const [x, y] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export default async function Page() {
  const solutionsCardData = await fetchSolutionCardDataRDS()

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-5 mt-16">
        Solutions de mobilité
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Catalogue de solutions durables pour les habitants des Pyrénées
      </p>
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto">
        {solutionsCardData.map(cardData => {
          const isInPyrenees = isPointInPolygon(
            [cardData.latitude, cardData.longitude],
            pyreneesPolygon
          )
          return (
            <div
              key={cardData.id}
              className="relative mb-4 max-w-[20rem] rounded-lg shadow-md"
            >
              <a href={cardData.link} className="no-underline text-inherit">
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
              </a>
              {isInPyrenees && (
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
