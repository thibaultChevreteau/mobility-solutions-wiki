import Link from "next/link"

// Footer component
export function Footer() {
  return (
    <footer className="mt-4 border-t-2 py-4 px-6">
      <Link href="/mentions-legales" className="underline hover:no-underline">
        Mentions légales
      </Link>
    </footer>
  )
}
