import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: 'The Malaysian Reader',
        slug: 'the-malaysian-reader',
        author: 'A. Author',
        description: 'A sample book about Malaysia',
        price_sen: 2500,
        weight_g: 300,
        stock: 10,
      },
      {
        title: 'Node & Web',
        slug: 'node-and-web',
        author: 'Dev Writer',
        description: 'Web development with Node.js',
        price_sen: 4500,
        weight_g: 400,
        stock: 5,
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
