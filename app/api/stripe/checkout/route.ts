import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PLANS } from '@/types/subscription'

export async function POST(req: NextRequest) {
  try {
    const { planId, userId } = await req.json()

    if (!planId || !userId) {
      return NextResponse.json(
        { error: 'Plan ID and User ID are required' },
        { status: 400 }
      )
    }

    const plan = PLANS[planId]
    if (!plan || planId === 'free') {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Crear customer en Stripe si no existe
    const customers = await stripe.customers.list({
      email: userId, // Aquí deberías usar el email del usuario
      limit: 1
    })

    let customer
    if (customers.data.length === 0) {
      customer = await stripe.customers.create({
        email: userId, // Reemplazar con email real
        metadata: {
          userId: userId
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
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${planId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: {
        userId: userId,
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