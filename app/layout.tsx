import type React from "react"
import "../styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalSiteHeader } from "@/components/conditional-site-header"
import { ConditionalSiteFooter } from "@/components/conditional-site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://inktelligence.com"),
  alternates: {
    canonical: "/",
  },
  title: "Inktelligence - Diseña tu tatuaje perfecto",
  description:
    "Utiliza el poder de la IA para crear diseños de tatuajes únicos y personalizados. De la idea a la tinta, te ayudamos a visualizar tu próximo tatuaje.",
  openGraph: {
    title: "Inktelligence - Diseña tu tatuaje perfecto",
    description:
      "Utiliza el poder de la IA para crear diseños de tatuajes únicos y personalizados. De la idea a la tinta, te ayudamos a visualizar tu próximo tatuaje.",
    url: "/",
    siteName: "Inktelligence",
    images: [
      {
        url: "logo.png",
        width: 1200,
        height: 630,
        alt: "Inktelligence",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inktelligence - Diseña tu tatuaje perfecto",
    description:
      "Utiliza el poder de la IA para crear diseños de tatuajes únicos y personalizados. De la idea a la tinta, te ayudamos a visualizar tu próximo tatuaje.",
    images: ["logo.png"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <ConditionalSiteHeader />
            <main className="flex-1">{children}</main>
            <ConditionalSiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
