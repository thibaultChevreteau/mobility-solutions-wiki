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
