'use client'

import React from 'react'
import Header from '../../components/Header'
import { useCart } from '../../lib/useCart'

export default function CartPage() {
  const { items, update, remove, clear, count } = useCart()
  const [booksMap, setBooksMap] = React.useState({})

  React.useEffect(() => {
    if (items.length === 0) return
    const ids = items.map((i) => i.bookId).join(',')
    fetch('/api/books')
      .then((r) => r.json())
      .then((books) => {
        const map = {}
        books.forEach((b) => (map[b.id] = b))
        setBooksMap(map)
      })
  }, [items])

  const subtotal = items.reduce((s, it) => s + (booksMap[it.bookId]?.price_sen || 0) * it.quantity, 0)

  return (
    <html>
      <body className="min-h-screen bg-gray-50">
        <Header cartCount={count()} />
        <main className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Your cart</h1>
          {items.length === 0 ? (
            <p>Your cart is empty. <a href="/books" className="text-blue-600">Browse books</a></p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {items.map((it) => (
                  <div key={it.bookId} className="bg-white p-4 rounded mb-3 flex items-center gap-4">
                    <img src={booksMap[it.bookId]?.cover_url || '/default-book.png'} alt="cover" className="h-16 w-12 object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold">{booksMap[it.bookId]?.title}</div>
                      <div className="text-sm text-gray-600">RM {(booksMap[it.bookId]?.price_sen/100 || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <input type="number" value={it.quantity} min={1} onChange={(e) => update(it.bookId, Number(e.target.value))} className="w-16 border p-1" />
                    </div>
                    <div>
                      <button onClick={() => remove(it.bookId)} className="text-red-600">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="bg-white p-4 rounded">
                <div className="font-semibold">Summary</div>
                <div className="mt-2">Subtotal: RM {(subtotal/100).toFixed(2)}</div>
                <div className="mt-4">
                  <a href="/checkout" className="block text-center bg-blue-600 text-white px-4 py-2 rounded">Proceed to Checkout</a>
                </div>
                <div className="mt-2 text-center">
                  <button onClick={clear} className="text-sm text-gray-600">Clear cart</button>
                </div>
              </aside>
            </div>
          )}
        </main>
      </body>
    </html>
  )
}
