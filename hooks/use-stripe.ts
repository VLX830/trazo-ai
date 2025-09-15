import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

export function useStripe() {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async (planId: string, userId: string) => {
    setLoading(true)
    
    try {
      // Crear checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, userId }),
      })

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