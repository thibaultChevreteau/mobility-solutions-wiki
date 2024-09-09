// Since I load the data in a client component I am not using anymore this function

import { unstable_noStore as noStore } from "next/cache"
import { Pool } from "pg"
import { isPointInPolygon, pyreneesPolygon } from "./utils"

const caCertBase64 = process.env.RDS_CA_CERT_BASE64

if (!caCertBase64) {
  throw new Error("RDS_CA_CERT_BASE64 environment variable is not set.")
}

let caCert
try {
  caCert = Buffer.from(caCertBase64, "base64").toString("utf-8")
} catch (error) {
  throw new Error("Failed to decode RDS_CA_CERT_BASE64.")
}

const pool = new Pool({
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT),
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true,
  },
})

const tableName =
  process.env.NODE_ENV === "production" ? "solutions" : "solutionsdev"

export async function fetchSolutionOverview() {
  noStore()
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
        longitude
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
