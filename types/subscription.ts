export interface Plan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
  popular?: boolean
}

export interface UserSubscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string | null
  stripePriceId: string | null
  plan: 'free' | 'pro' | 'ultra'
  status: 'active' | 'canceled' | 'past_due' | 'incomplete'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  generationsUsed: number
  generationsLimit: number
}

// Remover process.env de aquí - solo usar en server-side
export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    interval: 'month',
    features: ['5 diseños por mes', 'Resolución estándar', 'Estilos básicos'],
    stripePriceId: ''
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 5,
    interval: 'month',
    features: ['Diseños ilimitados', 'Resolución alta', 'Todos los estilos', 'Soporte prioritario'],
    stripePriceId: 'price_1S6xVnAOjgdVu8eku2vRlIV9' // Hardcodear aquí o usar función server-side
  },
  ultra: {
    id: 'ultra',
    name: 'Ultra',
    price: 48,
    interval: 'year',
    features: ['Funciones avanzadas', 'Resolución máxima', 'Acceso anticipado', 'Soporte dedicado'],
    stripePriceId: 'price_1S6xXFAOjgdVu8ekHcUS5OZW', // Hardcodear aquí o usar función server-side
    popular: true
  }
}