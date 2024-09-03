import { NextResponse } from "next/server"
import { pool, tableName } from "@/lib/dbClient"

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
