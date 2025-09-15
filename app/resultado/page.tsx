"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Loader2, AlertTriangle } from "lucide-react"

const ALLOWED_IMAGE_DOMAINS =
  (process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS ?? "")
    .split(",")
    .filter(Boolean)
if (ALLOWED_IMAGE_DOMAINS.length === 0) {
  throw new Error(
    "NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS debe incluir al menos un dominio"
  )
}
const IMAGE_PROXY = process.env.NEXT_PUBLIC_IMAGE_PROXY

function isAllowedImageUrl(url: string) {
  try {
    const { hostname } = new URL(url)
    return ALLOWED_IMAGE_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

// A wrapper component is needed to use useSearchParams with Suspense
function ResultadoContent() {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get("image")

  const handleDownload = async () => {
    if (!imageUrl || !isAllowedImageUrl(imageUrl)) {
      alert("El dominio de la imagen no está permitido.")
      return
    }
    try {
      // Fetch the image, optionally through a proxy for additional safety
      const targetUrl = IMAGE_PROXY
        ? `${IMAGE_PROXY}?url=${encodeURIComponent(imageUrl)}`
        : imageUrl
      const response = await fetch(targetUrl)
      if (!response.ok) throw new Error("Network response was not ok.")
      const blob = await response.blob()

      // Create a link to download it
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "tattoo-design.png" // Filename for the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading the image:", error)
      alert("Could not download the image. Please try again.")
    }
  }

  if (!imageUrl || !isAllowedImageUrl(imageUrl)) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Imagen no válida</h1>
        <p className="text-muted-foreground">
          El dominio de la imagen no está permitido. Por favor, vuelve a la
          página principal y genera un nuevo diseño.
        </p>
      </div>
    )
  }

  const displayUrl = IMAGE_PROXY
    ? `${IMAGE_PROXY}?url=${encodeURIComponent(imageUrl)}`
    : imageUrl

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Tu tatuaje está listo 🎉</h1>
      <div className="w-full max-w-md">
        <Image
          src={displayUrl || "/placeholder.svg"}
          alt="Tatuaje generado por IA"
          width={512}
          height={512}
          className="w-full h-auto rounded-2xl shadow-2xl"
          priority
        />
      </div>
      <Button
        onClick={handleDownload}
        className="mt-8 rounded-full px-8 py-3 h-auto text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all transform hover:scale-105"
      >
        <Download className="mr-2 h-5 w-5" />
        Descargar PNG
      </Button>
    </div>
  )
}

// The main page component uses Suspense to handle the client-side rendering of search params
export default function ResultadoPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResultadoContent />
    </React.Suspense>
  )
}
