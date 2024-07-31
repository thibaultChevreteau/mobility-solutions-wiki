//not used anymore but will be modified in the futur to be used
// Why attributes to sql functions are usefull ?

import { sql } from "@vercel/postgres"
import { CoordinatesField } from "./definitions"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchCoordinates() {
  noStore()
  try {
    const data = await sql<CoordinatesField>`
        SELECT
          latitude,
          longitude
        FROM solutions
      `

    const coordinates = data.rows
    return coordinates
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch all coordinates.")
  }
}
