export const generateSlug = (name: string) => {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
}

export const pyreneesPolygon: [number, number][] = [
  [43.81587270305823, -1.7816068109607344],
  [43.325004104008386, 0.12968726385829804],
  [43.03429988630792, 1.6224671723866744],
  [42.846840289300026, 3.3509492754749224],
  [41.8970711332641, 3.4467046638360386],
  [42.44605478246113, 0.011188027224996892],
  [42.76985792722391, -1.8072704992870186],
  [43.47097428016845, -2.393870064846836],
]

export const isPointInPolygon = (
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

import { jwtDecode } from "jwt-decode"
import { getAccessToken } from "@auth0/nextjs-auth0"

interface CustomJwtPayload {
  permissions?: string[]
}

export async function checkPermission(
  requiredPermission: string
): Promise<void> {
  const { accessToken } = await getAccessToken()

  if (!accessToken) {
    throw new Error("Access token is missing.")
  }

  const decodedToken = jwtDecode<CustomJwtPayload>(accessToken)
  const hasPermission = decodedToken.permissions?.includes(requiredPermission)

  if (!hasPermission) {
    throw new Error("You do not have permission to perform this action.")
  }
}
