"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, Trash2, History, User, CreditCard, Shield, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { TattooForm } from "@/components/tattoo-form"

export default function DashboardContent() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [myImages, setMyImages] = useState<Array<{ id: string; url: string; prompt: string }>>([])
  const [loadingMy, setLoadingMy] = useState(false)
  
  // Estados para el scroll horizontal
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const loadMyImages = async () => {
    try {
      setLoadingMy(true)
      const res = await fetch("/api/me/images", { cache: "no-store" })
      if (!res.ok) return
      const data = await res.json()
      setMyImages(data.items || [])
    } finally {
      setLoadingMy(false)
    }
  }

  useEffect(() => {
    loadMyImages()
  }, [])

  useEffect(() => {
    if (!loadingMy && myImages.length > 0) {
      setTimeout(checkScrollButtons, 100)
    }
  }, [loadingMy, myImages])

  useEffect(() => {
    const handleResize = () => {
      checkScrollButtons()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 280
      const gap = 24
      const scrollAmount = cardWidth + gap
      
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleDownload = (image: { id: string; url: string; prompt: string }) => {
    const link = document.createElement('a')
    link.href = image.url
    link.download = `tatuaje-${image.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = (imageId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este diseño?')) {
      setMyImages(prev => prev.filter(img => img.id !== imageId))
    }
  }

  return (
    <div className="w-full space-y-12">
      {/* Section: Generar tu tatuaje privado */}
      <section>
        <h2
          id="generar"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Generar tu tatuaje
        </h2>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <TattooForm
              source="dashboard"
              onStart={() => setGeneratedImage(null)}
              onSuccess={({ url }) => {
                setGeneratedImage(url)
                loadMyImages()
              }}
            />
            {generatedImage && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-semibold mb-4 text-center">¡Tu diseño está listo!</h3>
                <Card className="max-w-md mx-auto overflow-hidden rounded-2xl">
                  <Image
                    src={generatedImage || "/placeholder.svg"}
                    alt="Tatuaje generado"
                    width={512}
                    height={512}
                    className="w-full h-auto"
                  />
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Section: Galería Privada - ACTUALIZADA CON SCROLL HORIZONTAL */}
      <section>
        <h2
          id="galeria-privada"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Galería
        </h2>
        
        {loadingMy ? (
          // Loading skeleton con 4 cards
          <div className="flex gap-6 overflow-hidden px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-70 h-80 bg-muted rounded-2xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        ) : myImages.length === 0 ? (
          // Estado vacío
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Eye className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sin diseños aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza a crear increíbles diseños de tatuajes con IA
              </p>
              <Button 
                onClick={() => {
                  const generarSection = document.getElementById('generar')
                  generarSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Crear mi primer diseño
              </Button>
            </div>
          </div>
        ) : (
          // Galería con scroll horizontal
          <div className="relative px-4">
            {/* Botón scroll izquierda */}
            {canScrollLeft && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border shadow-lg hover:bg-background transition-all opacity-80 hover:opacity-100 rounded-full h-10 w-10"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            
            {/* Botón scroll derecha */}
            {canScrollRight && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border shadow-lg hover:bg-background transition-all opacity-80 hover:opacity-100 rounded-full h-10 w-10"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            {/* Contenedor de scroll horizontal */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
              onScroll={checkScrollButtons}
            >
              {myImages.map((img, index) => (
                <Card key={img.id} className="w-70 flex-shrink-0 overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <Image 
                        src={img.url || "/placeholder.svg"} 
                        alt={img.prompt} 
                        fill 
                        className="object-cover"
                        priority={index < 4}
                      />
                      
                      {/* Overlay con acciones - aparece en hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 h-10 w-10"
                            onClick={() => handleDownload(img)}
                          >
                            <Download className="h-4 w-4 text-white" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-red-500/50 h-10 w-10"
                            onClick={() => handleDelete(img.id)}
                          >
                            <Trash2 className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Información de la card */}
                    <div className="p-4">
                      <p className="text-sm font-medium line-clamp-2 leading-relaxed">{img.prompt}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Indicador para móviles */}
            {myImages.length > 1 && (
              <div className="mt-2 text-center text-xs text-muted-foreground md:hidden">
                Desliza horizontalmente para ver más diseños
              </div>
            )}
          </div>
        )}
      </section>

      {/* Resto de secciones sin cambios */}
      <section>
        <h2
          id="creditos-planes"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Créditos & Planes
        </h2>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Uso de Créditos</CardTitle>
            <CardDescription>Tienes 85 de 100 créditos disponibles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="mb-6 h-3 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Comprar Créditos</CardTitle>
                  <CardDescription>Recarga tu cuenta para seguir creando.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>10 Créditos</span> <span>$5</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>25 Créditos</span> <span>$10</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    <span>50 Créditos</span> <span>$18</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="rounded-xl bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                  <CardTitle>Suscripciones</CardTitle>
                  <CardDescription>Créditos ilimitados y más beneficios.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button className="w-full">Suscripción Mensual</Button>
                  <Button variant="secondary" className="w-full">
                    Suscripción Anual (Ahorra 20%)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2
          id="historial"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Historial de Actividad
        </h2>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 md:p-8 text-center text-muted-foreground">
            <History className="mx-auto h-12 w-12 mb-4" />
            <p className="font-medium">No recent activity</p>
            <p className="text-sm">Your generated designs will appear here.</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2
          id="ajustes"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Ajustes de Cuenta
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader className="flex-row items-center gap-4">
              <User className="size-8" />
              <div>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Nombre, email</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="flex-row items-center gap-4">
              <CreditCard className="size-8" />
              <div>
                <CardTitle>Facturación</CardTitle>
                <CardDescription>Planes, pagos</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="flex-row items-center gap-4">
              <Shield className="size-8" />
              <div>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>Notificaciones</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section>
        <h2
          id="soporte-faq"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Soporte / FAQ
        </h2>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cómo funcionan los créditos?</AccordionTrigger>
                <AccordionContent>
                  Cada generación de un set de 4 imágenes de tatuaje consume 1 crédito. Puedes comprar más créditos o
                  suscribirte para tener créditos ilimitados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Mis diseños son privados?</AccordionTrigger>
                <AccordionContent>
                  Sí, todos los diseños que generas en el dashboard son completamente privados y solo tú puedes verlos
                  en tu galería privada.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Puedo cancelar mi subscripción?</AccordionTrigger>
                <AccordionContent>
                  Sí, puedes cancelar tu suscripción en cualquier momento desde la sección de Facturación en tus
                  Ajustes de Cuenta.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
