import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET() {
  try {
    // Execute the SQL query
    const result = await sql`
      SELECT latitude, longitude
      FROM solutions
    `

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching coordinates:", error)
    return NextResponse.json(
      { error: "Error fetching coordinates" },
      { status: 500 }
    )
  }
}
