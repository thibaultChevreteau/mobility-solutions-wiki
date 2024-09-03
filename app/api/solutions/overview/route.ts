import { NextResponse } from "next/server"
import { pool, tableName } from "@/lib/dbClient"

const pyreneesPolygon: [number, number][] = [
  [43.81587270305823, -1.7816068109607344],
  [43.325004104008386, 0.12968726385829804],
  [43.03429988630792, 1.6224671723866744],
  [42.846840289300026, 3.3509492754749224],
  [41.8970711332641, 3.4467046638360386],
  [42.44605478246113, 0.011188027224996892],
  [42.76985792722391, -1.8072704992870186],
  [43.47097428016845, -2.393870064846836],
]

const isPointInPolygon = (
  point: [number, number],
  polygon: [number, number][]
): boolean => {
  const [x, y] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export async function GET() {
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

    return NextResponse.json(enrichedResults)
  } catch (error) {
    console.error("Error fetching solutions overview:", error)
    return NextResponse.json(
      { error: "Error fetching solutions overview" },
      { status: 500 }
    )
  }
}
