"use client"

import { SiteHeader } from "@/components/site-header"
import { usePathname } from "next/navigation"

export function ConditionalSiteHeader() {
  const pathname = usePathname()
  if (pathname.startsWith("/dashboard")) {
    return null
  }
  return <SiteHeader />
}

