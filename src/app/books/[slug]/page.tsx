'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useCart } from '../../../lib/useCart'

export default function ProductPage({ params }) {
  const { slug } = params
  const [book, setBook] = useState(null)
  const { add, count } = useCart()

  useEffect(() => {
    fetch(`/api/books/${slug}`)
      .then((r) => r.json())
      .then(setBook)
      .catch(() => setBook(null))
  }, [slug])

  if (!book) return <div>Loading...</div>

  return (
    <html>
      <body className="min-h-screen bg-gray-50">
        <Header cartCount={count()} />
        <main className="container mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <img src={book.cover_url || '/default-book.png'} alt={book.title} className="w-full object-cover" />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-sm text-gray-600">By {book.author}</p>
              <p className="mt-4">{book.description}</p>
              <p className="mt-4 text-lg font-semibold">RM {(book.price_sen / 100).toFixed(2)}</p>
              <div className="mt-4">
                <button onClick={() => add({ bookId: book.id, quantity: 1 })} className="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
