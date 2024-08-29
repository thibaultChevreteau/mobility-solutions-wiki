import { NextResponse } from "next/server"

import { Pool } from "pg"

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

export async function GET() {
  try {
    // Execute the SQL query using pool.query
    const result = await pool.query(`
      SELECT latitude, longitude, name
      FROM ${tableName}
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching coordinates:", error)
    return NextResponse.json(
      { error: "Error fetching coordinates" },
      { status: 500 }
    )
  }
}
