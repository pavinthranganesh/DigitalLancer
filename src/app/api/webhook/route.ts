import Stripe from 'stripe'
import prisma from '../../../lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function POST(req) {
  const buf = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = Number(session.metadata?.orderId)
    // mark order paid
    await prisma.payment.create({
      data: {
        orderId,
        provider: 'stripe',
        provider_payment_id: session.payment_intent || null,
        status: 'paid',
        amount_sen: Number(session.amount_total || 0),
      },
    })
    await prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } })
  }

  return new Response('ok')
}
