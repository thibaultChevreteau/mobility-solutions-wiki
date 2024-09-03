import Link from "next/link"

import { useMemo } from "react"
import dynamic from "next/dynamic"

const categories = [
  {
    name: "Véhicules",
    description:
      "Solutions innovantes pour véhicules, incluant des technologies écoénergétiques, des systèmes de sécurité avancés et des innovations en conduite autonome.",
  },
  {
    name: "Aménagements",
    description:
      "Idées d'aménagement durable pour optimiser les espaces liés à la mobilité, comme les infrastructures de transport et les stations de recharge.",
  },
  {
    name: "Application",
    description:
      "Applications intelligentes pour la mobilité, conçues pour améliorer les trajets, optimiser les itinéraires et faciliter la gestion des transports.",
  },
  {
    name: "Sensibilisation",
    description:
      "Ressources innovantes pour sensibiliser et éduquer sur des enjeux de mobilité durable et des pratiques de transport responsables.",
  },
  {
    name: "Atelier",
    description:
      "Ateliers pratiques sur des sujets de mobilité, allant des innovations en transport aux nouvelles technologies en infrastructures.",
  },
  {
    name: "Autres",
    description:
      "Solutions variées et durables liées à la mobilité, couvrant des besoins spécifiques non abordés ailleurs dans le domaine du transport.",
  },
]

function CategoryCard({
  name,
  description,
}: {
  name: string
  description: string
}) {
  // Function to convert name to a URL-friendly alias
  const generateSlug = (name: string) => {
    return name
      .toLowerCase() // Convert to lowercase
      .normalize("NFD") // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
  }

  const slug = generateSlug(name)

  return (
    <div className="bg-gray-200 p-6 rounded-lg min-w-64 max-w-96">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="mb-4">{description}</p>
      <Link href={`/${slug}`} className="text-gray-500 underline">
        Aller à la catégorie -&gt;
      </Link>
    </div>
  )
}

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("../app/ui/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )

  return (
    <div className="font-sans px-6 overflow-hidden mt-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 px-6 md:px-20 text-xl">
          <h1 className="text-3xl font-bold mb-5">
            Solutions de mobilité pour les habitants des Pyrénées
          </h1>
          <p>
            Ce wiki collaboratif vise à recenser et présenter les solutions de
            mobilité durables dans les Pyrénées et au delà.
          </p>
          <div className="mt-10">
            <Link
              href="/solutions"
              className="rounded-full bg-blue-500 text-white p-4"
            >
              Parcourir les solutions
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-80 rounded-lg overflow-hidden mt-10 md:mt-0">
          <Map />
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-10 text-center">
        Découvrir les catégories
      </h2>
      <div className="flex gap-6 overflow-x-auto md:overflow-x-hidden md:flex-wrap mt-10">
        {categories.map(category => (
          <CategoryCard
            key={category.name}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  )
}
