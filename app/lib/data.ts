//not used anymore but will be modified in the futur to be used
// Why attributes to sql functions are usefull ?

import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"
import { Pool } from "pg"
import fs from "fs"

const caCert = fs.readFileSync("certificates/eu-west-3-bundle.pem")

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

export async function fetchSolutionCardDataRDS() {
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
      FROM solutions
    `)

    const solutionsCardData = result.rows
    return solutionsCardData
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch solutions card data.")
  }
}

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
