"use client"

import React, { useRef, useState, useEffect } from "react"
import { useStripe } from "@/hooks/use-stripe"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

export default function PricingSection() {
  const { redirectToCheckout } = useStripe()
  const [checkoutPendingPlan, setCheckoutPendingPlan] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | 'ultra'>('free')
  const [bannerMessage, setBannerMessage] = useState<string | null>(null)
  const checkoutProcessingRef = useRef(false)

  const handleSubscribe = async (planId: string) => {
    if (checkoutProcessingRef.current) return
    checkoutProcessingRef.current = true
    setCheckoutPendingPlan(planId)
    try {
      await redirectToCheckout(planId)
    } finally {
      checkoutProcessingRef.current = false
      setCheckoutPendingPlan(null)
    }
  }

  // Fetch user's current plan
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/me/summary')
        if (!res.ok) return
        const data = await res.json()
        if (!mounted) return
        if (data?.plan) setCurrentPlan(data.plan)
      } catch (e) {
        // ignore
      }
    }
    load()

    // parse query params for success/canceled
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      const plan = params.get('plan') as 'pro' | 'ultra' | null
      setBannerMessage(plan ? `Suscripción a ${plan} completada.` : 'Pago completado.')
      // refresh plan
      load()
      // clear pending
      setCheckoutPendingPlan(null)
      // remove query params from URL for cleanliness
      try { window.history.replaceState({}, '', window.location.pathname) } catch (e) {}
    } else if (params.get('canceled') === 'true') {
      setBannerMessage('Pago cancelado. Puedes reintentar.')
      setCheckoutPendingPlan(null)
      try { window.history.replaceState({}, '', window.location.pathname) } catch (e) {}
    }

    return () => { mounted = false }
  }, [])

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-in">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Pricing
          </Badge>
          <h2 id="creditos-planes" className="text-3xl md:text-4xl font-bold tracking-tight">
            Créditos & Planes
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Elige el plan que mejor se adapte a tu flujo creativo. Ofrecemos opciones para probar gratis,
            suscribirte mensualmente o ahorrar con un plan anual.
          </p>
        </div>

        {bannerMessage && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="rounded-md bg-green-50 border border-green-100 text-green-800 px-4 py-3 text-sm">
              {bannerMessage}
            </div>
          </div>
        )}

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
              <Button
                className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
                onClick={() => { window.location.href = '/signup' }}
              >
                {currentPlan === 'free' ? 'Plan Actual' : 'Seleccionar Gratuito'}
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
              <Button 
                className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
                onClick={(e) => { e.stopPropagation(); handleSubscribe('pro') }}
                disabled={checkoutPendingPlan !== null || currentPlan === 'pro'}
              >
                {currentPlan === 'pro' ? 'Plan Actual' : (checkoutPendingPlan === 'pro' ? 'Procesando...' : 'Obtener Pro')}
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
                <Button 
                  className="w-full h-11 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
                  onClick={(e) => { e.stopPropagation(); handleSubscribe('ultra') }}
                  disabled={checkoutPendingPlan !== null || currentPlan === 'ultra'}
                >
                  {currentPlan === 'ultra' ? 'Plan Actual' : (checkoutPendingPlan === 'ultra' ? 'Procesando...' : 'Obtener Ultra')}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
        </div>
      </div>
    </section>
  )
}
