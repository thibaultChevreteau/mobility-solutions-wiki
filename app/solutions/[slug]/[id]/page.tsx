import { fetchSolutionById } from "@/lib/data"
import MarkdownRenderer from "@/lib/reactMarkdownRender"
import MapLoader from "@/ui/mapLoader"
import Image from "next/image"
import { LatLngTuple } from "leaflet"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: { id: string; slug: string }
}) {
  const id = params.id
  console.log("params", params)

  console.log("id", id)
  // if (!/^\d+$/.test(id)) {
  //   throw new Error("Invalid ID format")
  // }
  const slug = params.slug

  const solution = await fetchSolutionById(id)

  const location: LatLngTuple = [solution.latitude, solution.longitude]

  return (
    <div className="mx-4 font-heading">
      <div className="relative">
        <a
          href={`/solutions/${slug}/${id}/edit`}
          className="fixed w-10 h-10 rounded-full bg-primary flex items-center justify-center bottom-10 right-10 z-50"
        >
          <Image
            src="/pencil.svg"
            alt="Modify Solution"
            width={20}
            height={20}
          />
        </a>

        <Link href="/solutions" className="flex gap-2 -mt-3 mb-8">
          <Image
            src="/down-arrow.svg"
            alt="arrow"
            width={10}
            height={10}
            className="rotate-90"
          />
          <p className="text-xs font-light hover:font-normal">
            Retour aux solutions
          </p>
        </Link>
        <p className="mb-2 text-sm text-gray-400">{solution.category}</p>
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">{solution.name}</h1>
          {solution.isLocal && (
            <Image
              src="/pyreneesmobilite_logo.svg"
              alt={solution.name}
              width={50}
              height={50}
            />
          )}
        </div>
        <p className="text-base text-gray-600">{solution.description}</p>
        <div className="flex flex-wrap gap-4 justify-center my-4">
          <Image
            src={solution.imgurl}
            alt={solution.name}
            width={450}
            height={300}
            className="object-cover rounded-lg max-h-96"
          />
          <div className="rounded-lg shadow-md w-full max-w-md z-0">
            <MapLoader location={location} />
            <div className="p-4">
              <div className="flex grow gap-4">
                <Image
                  src={`/letter.svg`}
                  alt="Contact"
                  width={50}
                  height={50}
                />
                <MarkdownRenderer markdown={solution.contact} />
              </div>
              <a
                href={solution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-1 font-body text-white bg-blue-500 rounded-lg hover:bg-blue-400"
              >
                Visiter le site web
              </a>
            </div>
          </div>
        </div>
        <MarkdownRenderer markdown={solution.details} />
      </div>
    </div>
  )
}
