export type Solution = {
  id: string
  name: string
  description: string
  category: string
  imgurl: string
  imgId: string
  latitude: number
  longitude: number
  isLocal: boolean
  website?: string
  contact?: string
  details?: string
}

export const categories = [
  {
    name: "Véhicule",
    description:
      "Moyens de transports de personnes ou de biens, que ce soit pour un usage privé (e. g. vélo ou voiture), public (e. g. vélib ou taxi) ou collectif (e. g. bus ou train).",
  },
  {
    name: "Aménagement",
    description:
      "Innovation technique ou organisationnelle ayant un impact situé géographiquement, que ce soit à l’échelle du territoire, d’un quartier ou d’un groupement d’usager.",
  },
  {
    name: "Application",
    description:
      "Produits et services numériques répondant à des problématiques de mobilités : informer, coordonner, gérer et superviser.",
  },
  {
    name: "Sensibilisation",
    description:
      "Ressources favorisant l’adoption des solutions de mobilités durables, par la prise de conscience des enjeux liés au déplacement et l’incitation à l’action.",
  },
  {
    name: "Atelier",
    description:
      "Espaces collaboratifs ou privés, engagés pour une mobilités durables, donnant accès à des moyens de production et de réparation de véhicules.",
  },
  {
    name: "Autre",
    description:
      "Toutes solutions ne rentrant pas dans les catégories actuelles du Wiki.",
  },
]
