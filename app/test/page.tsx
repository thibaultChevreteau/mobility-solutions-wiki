import { fetchSolutionOverview } from "@/lib/data"
import { categories } from "@/lib/definitions"
import { generateSlug } from "@/lib/utils"

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

  console.log("filteredSolutions", filteredSolutions)

  return <div></div>
}
