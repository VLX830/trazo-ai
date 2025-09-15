"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"

export function ConditionalSiteFooter() {
  const pathname = usePathname()
  if (pathname.startsWith("/dashboard")) {
    return null
  }
  return <SiteFooter />
}
