import { fetchSolutionCardData } from "@/lib/data"
import Image from "next/image"
import { Tooltip } from "@nextui-org/tooltip"

export default async function Page() {
  const solutionsCardData = await fetchSolutionCardData()
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-5 mt-16">
        Solutions de mobilité
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Catalogue de solutions durables pour les habitants des Pyrénées
      </p>
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto">
        {solutionsCardData.map(cardData => (
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
            <div className="absolute -bottom-2.5 -right-2.5 z-10">
              <Tooltip
                content="Solution locale"
                className="bg-white border-gray-400 border-1 rounded-full px-1 text-sm"
                placement={"left-end"}
              >
                <Image
                  src="/pyreneesmobilite_logo.png"
                  alt="Pyrenees Mobilite Logo"
                  width={50}
                  height={50}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
