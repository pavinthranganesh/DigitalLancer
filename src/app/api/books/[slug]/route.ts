import prisma from '../../../../lib/prisma'

export async function GET(request, { params }) {
  const { slug } = params
  const book = await prisma.book.findUnique({ where: { slug } })
  if (!book) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(book), { status: 200 })
}
