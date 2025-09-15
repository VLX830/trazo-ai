import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Inktelligence. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/politica-privacidad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Política de privacidad
          </Link>
          <Link href="/terminos-uso" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Términos de servicio
          </Link>
        </div>
      </div>
    </footer>
  )
}
