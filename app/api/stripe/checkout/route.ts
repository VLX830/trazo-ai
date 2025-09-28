import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe.server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Definir Price IDs aquí en el servidor
const PRICE_IDS = {
  pro: process.env.STRIPE_PRO_PRICE_ID || null,
  ultra: process.env.STRIPE_ULTRA_PRICE_ID || null,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const planId = body?.planId
    const requestId = req.headers.get('x-request-id') || 'no-request-id'

  // Logging temporal para depuración
  console.log('[stripe/checkout] incoming body:', JSON.stringify(body), 'requestId:', requestId)

    if (!planId) {
      console.warn('[stripe/checkout] missing planId in request body')
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // Verificar autenticación
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.warn('[stripe/checkout] unauthenticated request for plan:', planId)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[stripe/checkout] authenticated user:', user.email, 'plan:', planId)

    // Obtener Price ID desde variables de entorno
    const priceId = PRICE_IDS[planId as keyof typeof PRICE_IDS]
    // Logging útil: indicar qué plan se resolvió y si existe precio configurado (no imprimir el value)
    console.log('[stripe/checkout] resolved plan:', planId, 'hasPriceConfigured:', !!priceId)
    if (!priceId) {
      console.error('Missing price id for plan:', planId)
      return NextResponse.json(
        { error: `Price ID not configured for plan ${planId}` },
        { status: 500 }
      )
    }
    if (planId === 'free') {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Buscar o crear customer en Stripe
    const customers = await stripe.customers.list({
      email: user.email!,
      limit: 1
    })

    let customer
    if (customers.data.length === 0) {
      customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          userId: user.id
        }
      })
    } else {
      customer = customers.data[0]
    }

    // Crear checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true&plan=${planId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
      metadata: {
        userId: user.id,
        planId: planId
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}