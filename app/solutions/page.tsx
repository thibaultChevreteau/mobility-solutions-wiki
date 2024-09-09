import Image from "next/image"
import { Tooltip } from "@nextui-org/tooltip"
import { categories } from "@/lib/definitions"
import { generateSlug } from "@/lib/utils"
import { fetchSolutionOverview } from "@/lib/data"
import Switch from "@/ui/switch"
import MultiSelect from "@/ui/multiSelect"
import Link from "next/link"

const options = categories.map(category => ({
  label: category.name,
  value: generateSlug(category.name),
}))

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    categories?: string
    solutions?: string
  }
}) {
  const solutionsOverview = await fetchSolutionOverview()

  // Get categories and solutions from the URL
  const categoriesQuery = searchParams?.categories || ""
  const localOnly = searchParams?.solutions === "locales"

  // Split categories if they exist in the URL
  const selectedCategories = categoriesQuery ? categoriesQuery.split(",") : []

  // Filter the data based on categories and solutions
  const filteredSolutions = solutionsOverview.filter(cardData => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        selectedCategory => selectedCategory === generateSlug(cardData.category)
      )

    const matchesLocal = !localOnly || cardData.isLocal

    return matchesCategory && matchesLocal
  })

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-5 mt-16">
        Solutions de mobilité
      </h1>
      <p className="text-center text-gray-600 mb-10 mx-4">
        Catalogue de solutions durables pour les habitants des Pyrénées
      </p>
      <div className="flex text-gray-600 justify-center items-center border-y-2 mb-2 py-2 gap-10">
        <div className="flex">
          <p className="mx-2">Solutions locales</p>
          <Switch />
        </div>
        <MultiSelect options={options} />
      </div>
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto">
        {filteredSolutions.map(cardData => {
          if (localOnly && !cardData.isLocal) {
            return null
          }
          return (
            <Link
              href={`/solutions/${cardData.id}`}
              key={cardData.id}
              className="relative mb-4 max-w-[20rem] rounded-lg shadow-md"
            >
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
              {cardData.isLocal && (
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
            </Link>
          )
        })}
      </div>
    </div>
  )
}
