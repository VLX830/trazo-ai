"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-4 font-bold" aria-label="TRAZO AI">
          <LogoMark className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 text-foreground" />
          <span className="text-2xl font-black tracking-tighter text-foreground transition-colors hover:text-primary" 
                style={{ 
                  fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-0.025em',
                  fontVariationSettings: '"wght" 900'
                }}>
            TRAZO AI
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
          >
            Inicio
          </Link>
          <Link
            href="/galeria"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Galería
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault()
                document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            FAQ
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Cambiar tema"
          >
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Empezar ahora
            <ChevronRight className="ml-1 size-4" />
          </Link>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Cambiar tema"
          >
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menú"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-background/95 backdrop-blur-lg border-b animate-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="py-2 text-sm font-medium"
              onClick={(e) => {
                setMobileMenuOpen(false)
                if (window.location.pathname === "/") {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
            >
              Inicio
            </Link>
            <Link href="/galeria" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Galería
            </Link>
            <Link
              href="/#faq"
              className="py-2 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link href="/login" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Iniciar sesión
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Empezar ahora
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
