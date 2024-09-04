import Switch from "@/ui/switch"
import SwitchQuery from "@/ui/switchQuery"
import { Suspense } from "react"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  return (
    <div>
      <SwitchQuery />
    </div>
  )
}
