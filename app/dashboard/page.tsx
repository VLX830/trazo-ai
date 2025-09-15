import type React from "react"
import type { Metadata } from "next"
import DashboardPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardPage(): React.ReactElement {
  return <DashboardPageClient />
}

