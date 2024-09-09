import { fetchSolutionById } from "@/lib/data"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const solution = await fetchSolutionById(id)
  console.log(solution)

  return (
    <div>
      <h1>{solution.name}</h1>
    </div>
  )
}
