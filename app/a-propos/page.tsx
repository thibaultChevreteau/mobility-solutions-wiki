import { fetchCoordinates } from "@/lib/data"

export default async function Page() {
  const coordinates = await fetchCoordinates()
  console.log(coordinates)
  return <p>Coordinates</p>
}
