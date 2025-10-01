"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  HelpCircle,
  History,
  LayoutGrid,
  LogOut,
  Menu,
  Settings,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoMark } from "@/components/logo-mark"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      router.push("/login")
    }
  }

  const scrollToHash = (hash: string) => {
    const targetId = hash.replace("#", "")
    const targetElement = document.getElementById(targetId)
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(null, "", `#${targetId}`)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      scrollToHash(href)
    } else {
      router.push(href)
    }
  }

  const navItems = [
    { name: "Generar", icon: Sparkles, href: "#generar" },
    { name: "Galería Privada", icon: LayoutGrid, href: "#galeria-privada" },
    { name: "Créditos & Planes", icon: CreditCard, href: "#creditos-planes" },
    { name: "Historial", icon: History, href: "#historial" },
    { name: "Ajustes", icon: Settings, href: "#ajustes" },
    { name: "Soporte / FAQ", icon: HelpCircle, href: "#soporte-faq" },
  ]

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-2 overflow-y-auto">
  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 sticky top-0 z-20 bg-background">
          <Link href="/" className="flex items-center gap-3 font-semibold">
          <LogoMark className="h-9 w-9 sm:h-10 sm:w-10 text-foreground" />
          <span
            className={cn("text-base sm:text-lg md:text-xl tracking-tight text-foreground transition-colors hover:text-primary", isCollapsed && "hidden")}
            style={{
              fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              fontVariationSettings: '"wght" 900',
            }}
          >
            TRAZO AI
          </span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className={cn(isCollapsed && "hidden")}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <aside
        className={cn(
          "hidden md:block border-r bg-background transition-all duration-300 ease-in-out sticky top-0 h-screen",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-[100dvh] flex-col p-0 w-64 overflow-hidden overscroll-contain">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="w-full flex-1">{/* Optional: Can add breadcrumbs or search here */}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => scrollToHash("#ajustes")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Ajustes</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => scrollToHash("#soporte-faq")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Soporte</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
