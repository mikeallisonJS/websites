import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { stripe } from '../../../lib/stripe'

export async function POST(request: NextRequest) {
  const line_items = await request.json()
  console.log('line_items', line_items)
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    line_items,
    success_url: `${headers().get('origin')}/success`,
    cancel_url: `${headers().get('origin')}/`
  })
  return Response.json({ sessionId: checkoutSession.id })
}
