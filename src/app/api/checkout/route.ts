import Stripe from 'stripe'
import prisma from '../../lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function GET(request) {
  const books = await prisma.book.findMany({})
  return new Response(JSON.stringify(books), { status: 200 })
}

export async function POST(request) {
  const body = await request.json()
  // body: {items: [{bookId, quantity}], shipping, email}
  const { items, shipping, email } = body
  if (!items || items.length === 0) return new Response('No items', { status: 400 })

  // Build line items
  const line_items = []
  let total = 0
  for (const it of items) {
    const book = await prisma.book.findUnique({ where: { id: it.bookId } })
    if (!book) continue
    const amount = book.price_sen
    total += amount * it.quantity
    line_items.push({
      price_data: {
        currency: 'myr',
        product_data: { name: book.title },
        unit_amount: amount,
      },
      quantity: it.quantity,
    })
  }

  // Create order in DB (status pending)
  const order = await prisma.order.create({
    data: {
      email,
      total_sen: total,
      shipping_addr: shipping || {},
      shipping_cost: 0,
      tax_sen: 0,
      status: 'pending',
    },
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    metadata: { orderId: String(order.id) },
  })

  // store session id
  await prisma.order.update({ where: { id: order.id }, data: { stripe_session: session.id } })

  return new Response(JSON.stringify({ url: session.url }), { status: 200 })
}
