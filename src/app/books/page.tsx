'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useCart } from '../../lib/useCart'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const { add, count } = useCart()

  useEffect(() => {
    fetch('/api/books')
      .then((r) => r.json())
      .then(setBooks)
      .catch(() => setBooks([]))
  }, [])

  return (
    <html>
      <body className="min-h-screen bg-gray-50">
        <Header cartCount={count()} />
        <main className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Books</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((b) => (
              <div key={b.id} className="bg-white p-4 rounded shadow">
                <img src={b.cover_url || '/default-book.png'} alt={b.title} className="h-40 w-full object-cover mb-3" />
                <h2 className="font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-600">{b.author}</p>
                <p className="mt-2 text-gray-800">RM {(b.price_sen / 100).toFixed(2)}</p>
                <div className="mt-3 flex gap-2">
                  <a href={`/books/${b.slug}`} className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded">View</a>
                  <button onClick={() => add({ bookId: b.id, quantity: 1 })} className="text-sm px-3 py-1 bg-green-600 text-white rounded">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>
  )
}
