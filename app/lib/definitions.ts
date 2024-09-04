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
      "Solutions innovantes pour véhicules, incluant des technologies écoénergétiques, des systèmes de sécurité avancés et des innovations en conduite autonome.",
  },
  {
    name: "Aménagement",
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
    name: "Autre",
    description:
      "Solutions variées et durables liées à la mobilité, couvrant des besoins spécifiques non abordés ailleurs dans le domaine du transport.",
  },
]
