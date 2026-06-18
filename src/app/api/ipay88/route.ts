import prisma from '../../../lib/prisma'
import { createIpay88Session } from '../../../lib/gateways/ipay88'

export async function POST(request) {
  const body = await request.json()
  const { items, shipping, email } = body
  if (!items || items.length === 0) return new Response('No items', { status: 400 })

  // create order
  let total = 0
  for (const it of items) {
    const book = await prisma.book.findUnique({ where: { id: it.bookId } })
    if (!book) continue
    total += book.price_sen * it.quantity
  }

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

  // create iPay88 session URL (stub)
  const session = await createIpay88Session(order)

  return new Response(JSON.stringify({ url: session.url }), { status: 200 })
}
