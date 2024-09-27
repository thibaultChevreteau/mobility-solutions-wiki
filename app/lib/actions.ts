"use server"

import { z } from "zod"
import { pool, tableName } from "./dbClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getAccessToken } from "@auth0/nextjs-auth0"
import { jwtDecode, JwtPayload } from "jwt-decode"
import ImageKit from "imagekit"
import { checkPermission } from "./utils"

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  imgurl: z.string(),
  imgId: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  website: z.string().optional(),
  contact: z.string().optional(),
  details: z.string().optional(),
})

const NewSolution = FormSchema.omit({ id: true })

interface CustomJwtPayload extends JwtPayload {
  permissions?: string[]
}

export async function newSolution(formData: FormData) {
  await checkPermission("write:solutions")

  const image = formData.get("image") as unknown as File

  const arrayBuffer = await image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const imageData = await imageKit.upload({
    file: buffer,
    fileName: image.name,
  })

  const {
    name,
    description,
    category,
    imgurl,
    imgId,
    latitude,
    longitude,
    website,
    contact,
    details,
  } = NewSolution.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    imgurl: imageData.url,
    imgId: imageData.fileId,
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    website: formData.get("website") || undefined,
    contact: formData.get("contact") || undefined,
    details: formData.get("details") || undefined,
  })

  console.log({
    name,
    description,
    category,
    imgurl,
    imgId,
    latitude,
    longitude,
    website,
    contact,
    details,
  })

  await pool.query(
    `INSERT INTO ${tableName} (name, description, category, imgurl, imgId, latitude, longitude, website, contact, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      name,
      description,
      category,
      imgurl,
      imgId,
      latitude,
      longitude,
      website,
      contact,
      details,
    ]
  )

  revalidatePath("/solutions")
  redirect("/solutions")
}
