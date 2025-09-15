"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Download, Trash2, History, User, CreditCard, Shield, ChevronLeft, ChevronRight, Eye, ChevronDown, Save, Edit } from "lucide-react"
import { TattooForm } from "@/components/tattoo-form"

export default function DashboardPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [myImages, setMyImages] = useState<Array<{ id: string; url: string; prompt: string }>>([])
  const [loadingMy, setLoadingMy] = useState(false)

  // Estados para el scroll horizontal
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Estados para los ajustes de cuenta
  const [activeSettingPanel, setActiveSettingPanel] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
    avatar: ""
  })
  const [billingInfo, setBillingInfo] = useState({
    plan: "Gratuito",
    creditsRemaining: 85,
    totalCredits: 100,
    nextBilling: "N/A"
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    language: "es",
    theme: "system"
  })

  const IMAGES_PER_VIEW = 4

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
  }, [loadingMy, myImages, currentIndex])

  useEffect(() => {
    const handleResize = () => {
      checkScrollButtons()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const checkScrollButtons = () => {
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex + IMAGES_PER_VIEW < myImages.length)
  }

  const scroll = (direction: 'left' | 'right') => {
    let newIndex = currentIndex
    
    if (direction === 'left' && canScrollLeft) {
      newIndex = Math.max(0, currentIndex - 1)
    } else if (direction === 'right' && canScrollRight) {
      newIndex = Math.min(myImages.length - IMAGES_PER_VIEW, currentIndex + 1)
    }
    
    setCurrentIndex(newIndex)
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
      setMyImages(prev => {
        const newImages = prev.filter(img => img.id !== imageId)
        // Ajustar currentIndex si es necesario
        const maxIndex = Math.max(0, newImages.length - IMAGES_PER_VIEW)
        if (currentIndex > maxIndex) {
          setCurrentIndex(maxIndex)
        }
        return newImages
      })
    }
  }

  // Funciones para manejar los ajustes
  const handleSaveProfile = () => {
    console.log('Guardando perfil:', userProfile)
    alert('Perfil actualizado correctamente')
    setActiveSettingPanel(null)
  }

  const handleSaveBilling = () => {
    console.log('Actualizando facturación:', billingInfo)
    alert('Información de facturación actualizada')
    setActiveSettingPanel(null)
  }

  const handleSavePreferences = () => {
    console.log('Guardando preferencias:', preferences)
    alert('Preferencias guardadas correctamente')
    setActiveSettingPanel(null)
  }

  const toggleSettingPanel = (panelId: string) => {
    setActiveSettingPanel(activeSettingPanel === panelId ? null : panelId)
  }

  // Obtener las imágenes visibles
  const visibleImages = myImages.slice(currentIndex, currentIndex + IMAGES_PER_VIEW)

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
                // refrescar galería privada
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

      {/* Section: Galería Privada */}
      <section>
        <h2
          id="galeria-privada"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Galería
        </h2>
        
        {loadingMy ? (
          // Loading skeleton con 4 cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-80 bg-muted rounded-2xl animate-pulse" />
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
          // Galería con scroll de 1 en 1
          <div className="relative">
            {/* Botones de navegación - solo aparecen si hay más de 4 imágenes */}
            {myImages.length > IMAGES_PER_VIEW && (
              <>
                {/* Botón scroll izquierda */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border shadow-lg hover:bg-background transition-all rounded-full h-10 w-10 ${
                    canScrollLeft ? 'opacity-80 hover:opacity-100' : 'opacity-30 cursor-not-allowed'
                  }`}
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                {/* Botón scroll derecha */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border shadow-lg hover:bg-background transition-all rounded-full h-10 w-10 ${
                    canScrollRight ? 'opacity-80 hover:opacity-100' : 'opacity-30 cursor-not-allowed'
                  }`}
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Grid de imágenes - muestra 4 a la vez */}
            <div className="px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleImages.map((img, index) => (
                  <Card key={img.id} className="overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Indicador de posición */}
            {myImages.length > IMAGES_PER_VIEW && (
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Mostrando {currentIndex + 1}-{Math.min(currentIndex + IMAGES_PER_VIEW, myImages.length)} de {myImages.length} diseños
              </div>
            )}
          </div>
        )}
      </section>

      {/* Section: Créditos & Planes - AJUSTE DE TAMAÑOS DE TEXTO */}
      <section>
        <h2
          id="creditos-planes"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Créditos & Planes
        </h2>

        {/* Tres planes con espaciado ajustado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Plan Gratuito - CardContent realineado */}
          <Card className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
            <CardHeader className="text-center pb-4 flex-shrink-0">
              <div className="text-base font-medium text-gray-500 mb-2">Gratuito</div>
              <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
              <CardDescription className="text-base">
                Para comenzar a explorar
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col px-6 pb-6">
              <div className="mb-auto">
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">5 diseños por mes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Resolución estándar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Estilos básicos</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Button className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md">
                  Plan Actual
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Mensual - CardContent realineado */}
          <Card className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
            <CardHeader className="text-center pb-4 flex-shrink-0">
              <div className="text-base font-medium text-gray-500 mb-2">Pro</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900">€5</span>
                <span className="text-lg text-gray-500">/mes</span>
              </div>
              <CardDescription className="text-base">
                Todo en Gratuito, además
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col px-6 pb-6">
              <div className="mb-auto">
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Diseños ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Resolución alta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Todos los estilos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Soporte prioritario</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Button className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md">
                  Obtener Pro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Anual - CardContent realineado */}
          <Card className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col relative overflow-hidden">
            {/* Solo el gradiente exacto como en la imagen */}
            <div className="absolute bottom-0 inset-x-0 h-[55%]" 
              style={{
                background: "linear-gradient(90deg, #FF66B6 0%, #FFCC33 100%)",
                opacity: 0.8,
                mixBlendMode: "normal",
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
              }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <CardHeader className="text-center pb-4 flex-shrink-0">
                <div className="text-base font-medium text-gray-500 mb-2">Ultra</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">€48</span>
                  <span className="text-lg text-gray-500">/año</span>
                </div>
                <CardDescription className="text-base">
                  Todo en Pro, además
                </CardDescription>
                <div className="mt-2">
                  <span className="text-sm font-medium text-white bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    Ahorra 20%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-6 pb-6">
                <div className="mb-auto">
                  <div className="space-y-4 pt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Funciones avanzadas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Resolución máxima</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Acceso anticipado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Soporte dedicado</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Button className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md">
                    Obtener Ultra
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Section: Historial de Actividad */}
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

      {/* Section: Ajustes de Cuenta */}
      <section>
        <h2
          id="ajustes"
          className="text-3xl font-bold tracking-tight mb-6 scroll-mt-24"
        >
          Ajustes de Cuenta
        </h2>
        <div className="space-y-4">
          {/* Card de Perfil */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader 
              className="flex-row items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSettingPanel('profile')}
            >
              <User className="size-8 text-primary" />
              <div className="flex-1">
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Nombre, email</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className={`h-4 w-4 transition-transform ${activeSettingPanel === 'profile' ? 'rotate-180' : ''}`} />
              </Button>
            </CardHeader>
            
            {activeSettingPanel === 'profile' && (
              <CardContent className="space-y-6 border-t bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="vlx304@email.com"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Foto de perfil</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Cambiar foto
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSaveProfile} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveSettingPanel(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Card de Facturación */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader 
              className="flex-row items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSettingPanel('billing')}
            >
              <CreditCard className="size-8 text-primary" />
              <div className="flex-1">
                <CardTitle>Facturación</CardTitle>
                <CardDescription>Planes, pagos</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className={`h-4 w-4 transition-transform ${activeSettingPanel === 'billing' ? 'rotate-180' : ''}`} />
              </Button>
            </CardHeader>
            
            {activeSettingPanel === 'billing' && (
              <CardContent className="space-y-6 border-t bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Plan actual</Label>
                      <p className="text-lg font-semibold text-primary">{billingInfo.plan}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Créditos restantes</Label>
                      <p className="text-lg font-semibold">{billingInfo.creditsRemaining} de {billingInfo.totalCredits}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Próxima facturación</Label>
                      <p className="text-lg">{billingInfo.nextBilling}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Métodos de pago</Label>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">**** **** **** 4242</span>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Agregar método de pago
                  </Button>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSaveBilling} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Actualizar facturación
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveSettingPanel(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Card de Preferencias */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader 
              className="flex-row items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSettingPanel('preferences')}
            >
              <Shield className="size-8 text-primary" />
              <div className="flex-1">
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>Notificaciones</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className={`h-4 w-4 transition-transform ${activeSettingPanel === 'preferences' ? 'rotate-180' : ''}`} />
              </Button>
            </CardHeader>
            
            {activeSettingPanel === 'preferences' && (
              <CardContent className="space-y-6 border-t bg-muted/20">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Notificaciones</Label>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por email</Label>
                        <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones push</Label>
                        <p className="text-sm text-muted-foreground">Alertas en tiempo real</p>
                      </div>
                      <Switch
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emails de marketing</Label>
                        <p className="text-sm text-muted-foreground">Ofertas y novedades</p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketingEmails: checked }))}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select 
                      id="language"
                      className="w-full px-3 py-2 border rounded-md"
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <select 
                      id="theme"
                      className="w-full px-3 py-2 border rounded-md"
                      value={preferences.theme}
                      onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                    >
                      <option value="system">Sistema</option>
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSavePreferences} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar preferencias
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveSettingPanel(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </section>

      {/* Section: Soporte / FAQ */}
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
