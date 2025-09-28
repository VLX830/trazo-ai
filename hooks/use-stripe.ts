import { useState } from 'react'
import { getStripe } from '@/lib/stripe.client'

export function useStripe() {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async (planId: string) => {
    setLoading(true)
    
    try {
      // generate a short request id to correlate client/server logs
      const requestId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
      console.log('[useStripe] redirectToCheckout called for', planId, 'requestId:', requestId)
      // Crear checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-request-id': requestId,
        },
        body: JSON.stringify({ planId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirigir a Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (redirectError) {
        throw new Error(redirectError.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return { redirectToCheckout, loading }
}