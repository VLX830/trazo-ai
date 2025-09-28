// Este archivo mantiene compatibilidad con importaciones antiguas.
// Importa explícitamente las implementaciones server/client desde
// `lib/stripe.server` y `lib/stripe.client`. Evita ejecutar código
// que use la secret en el bundle del cliente.

export { getStripe } from './stripe.client'
export { stripe } from './stripe.server'
