import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe.server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Try to find an active subscription in Stripe by customer email
    const customers = await stripe.customers.list({ email: user.email || undefined, limit: 1 })
    if (customers.data.length === 0) {
      return NextResponse.json({ plan: 'free' })
    }

    const customer = customers.data[0]
    // List subscriptions for this customer
    const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 10 })

    // Find an active or trialing subscription and map price -> plan
    const active = subs.data.find(s => ['active', 'trialing', 'past_due', 'incomplete'].includes(s.status))
    if (!active) return NextResponse.json({ plan: 'free' })

    const priceId = active.items.data[0]?.price?.id
    // Compare against env price ids
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) return NextResponse.json({ plan: 'pro' })
    if (priceId === process.env.STRIPE_ULTRA_PRICE_ID) return NextResponse.json({ plan: 'ultra' })

    return NextResponse.json({ plan: 'free' })
  } catch (error) {
    console.error('Error in /api/me/summary', error)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
