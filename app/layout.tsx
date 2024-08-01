import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavBar from "./ui/navbar"
import { Footer } from "./ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { template: "%s | Pyrénées Mobilité", default: "Pyrénées Mobilité" },
  description:
    "Catalogue de solutions de mobilité durables pour les habitants des Pyrénées",
  metadataBase: new URL("https://mobility-solutions-wiki.vercel.app/"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative max-w-7xl m-auto flex flex-col min-h-screen`}
      >
        <NavBar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
