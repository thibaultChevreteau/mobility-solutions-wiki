//not used anymore but will be modified in the futur to be used
// Why attributes to sql functions are usefull ?

import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchSolutionCardData() {
  noStore()
  try {
    const data = await sql`
        SELECT
        id,  
        imgUrl,
          category,
          name,
          description,
          latitude,
          longitude
        FROM solutions
      `

    const solutionsCardData = data.rows
    return solutionsCardData
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch solutions card data.")
  }
}
