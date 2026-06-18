import prisma from '../../../lib/prisma'

export async function GET() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: 'desc' } })
  return new Response(JSON.stringify(books), { status: 200 })
}
