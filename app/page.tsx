import Link from "next/link"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import { categories } from "./lib/staticData"
import { generateSlug } from "./lib/utils"
import NewSolutionButton from "./ui/newSolutionButton"

function CategoryCard({
  name,
  description,
}: {
  name: string
  description: string
}) {
  const slug = generateSlug(name)

  return (
    <div className="flex flex-col bg-gray-200 p-6 rounded-lg min-w-64 max-w-96">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="mb-4 grow">{description}</p>
      <Link
        href={`/solutions?categories=${slug}`}
        className="text-gray-500 hover:underline"
      >
        Aller à la catégorie -&gt;
      </Link>
    </div>
  )
}

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("./ui/landingPageMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )

  return (
    <div className="font-sans px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 px-6 md:px-20 text-xl">
          <h1 className="text-3xl font-bold mb-5">
            Solutions de mobilité pour les habitants des Pyrénées
          </h1>
          <p>
            Ce wiki collaboratif vise à recenser et présenter les solutions de
            mobilité durables dans les Pyrénées et au-delà.
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
        <div className="w-full md:w-1/2 h-80 rounded-lg overflow-hidden mt-10 md:mt-0 z-0">
          <Map />
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-10 text-center">
        Découvrir les catégories
      </h2>
      <div className="flex gap-6 overflow-x-auto md:overflow-x-hidden md:flex-wrap mt-5">
        {categories.map(category => (
          <CategoryCard
            key={category.name}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col mt-10 md:flex-1">
          <h2 className="text-2xl font-bold mb-5">Envie de Participer ?</h2>
          <p className="mb-2 flex-grow">
            Vous connaissez une solution et souhaitez l&rsquo;ajouter. <br />
            Vous êtes un industriel, une collectivité ou bien un particulier.
            N&rsquo;hésitez pas à partager votre solution. <br />
            Elle sera relue par un membre de l&rsquo;équipe avant d&rsquo;être
            publiée.
          </p>
          <div>
            <NewSolutionButton />
          </div>
        </div>

        <div className="mt-10 md:flex-1">
          <h2 className="text-2xl font-bold mb-5">
            Le collectif Pyrénées Mobilité
          </h2>
          <p className="mb-2 flex-grow">
            Le projet du Wiki des Mobilités a été initié par la French Tech
            Pyrénées-Adour suite au salon Innovadour 2023. Notre équipe est
            composée de bénévoles partageant une passion commune pour la
            mobilité et l&rsquo;innovation responsable. <br /> L&rsquo;équipe
            actuelle comprend Thibault Chevreteau (développeur web freelance),
            Quentin Plisson (ingénieur indépendant), Jean-François Cazajous
            (animateur FrenchTech) et Marine Cuiec (responsable juridique et RSE
            chez Keematic).
          </p>
          <Link
            href={"mailto:thibault.chevreteau@gmail.com"}
            className="text-gray-500 hover:underline"
          >
            Nous contacter par e-mail -&gt;
          </Link>
        </div>
      </div>
    </div>
  )
}
