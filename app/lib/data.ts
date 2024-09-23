import { generateSlug, isPointInPolygon, pyreneesPolygon } from "./utils"
import { pool, tableName } from "./dbClient"

export async function fetchSolutionOverview() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        imgUrl,
        category,
        name,
        description,
        latitude,
        longitude
      FROM ${tableName}
    `)

    // Map over the results to add the `isLocal` field
    const enrichedResults = result.rows.map(row => ({
      ...row,
      isLocal: isPointInPolygon([row.latitude, row.longitude], pyreneesPolygon),
      slug: generateSlug(row.name),
    }))

    const solutionsOverview = enrichedResults
    return solutionsOverview
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch solutions card data.")
  }
}

export async function fetchSolutionById(id: string) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        imgUrl,
        category,
        name,
        description,
        latitude,
        longitude,
        website,
        contact,
        details
      FROM ${tableName}
      WHERE id = $1
    `,
      [id]
    )

    if (result.rows.length === 0) {
      throw new Error(`Solution with id ${id} not found.`)
    }

    const solution = result.rows[0]
    solution.isLocal = isPointInPolygon(
      [solution.latitude, solution.longitude],
      pyreneesPolygon
    )
    return solution
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error(`Failed to fetch solution with id ${id}.`)
  }
}
