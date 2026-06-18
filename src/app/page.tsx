import prisma from '../lib/prisma'

export default function Home() {
  return (
    <html>
      <body>
        <main>
          <h1>DigitalLancer</h1>
          <p>Welcome — a starter e-commerce scaffold has been installed. Open /api/books to see sample books.</p>
        </main>
      </body>
    </html>
  )
}
