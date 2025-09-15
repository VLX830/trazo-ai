export interface Plan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
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

export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    interval: 'month',
    features: ['10 diseños por mes', 'Resolución estándar', 'Estilos básicos'],
    stripePriceId: ''
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 5,
    interval: 'month',
    features: ['Diseños ilimitados', 'Resolución alta', 'Todos los estilos', 'Soporte prioritario'],
    stripePriceId: 'prod_T33dJ8JAAZShuX' // 👈 REEMPLAZAR AQUÍ
  },
  ultra: {
    id: 'ultra',
    name: 'Ultra',
    price: 48,
    interval: 'year',
    features: ['Funciones avanzadas', 'Resolución máxima', 'Acceso anticipado', 'Soporte dedicado'],
    stripePriceId: 'prod_T33esQjQzUKQkW' // 👈 REEMPLAZAR AQUÍ
  }
}