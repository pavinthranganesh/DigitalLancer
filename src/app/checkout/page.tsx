'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useCart } from '../../lib/useCart'

export default function CheckoutPage() {
  const { items, clear, count } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // redirect to cart if empty
    if (!items || items.length === 0) {
      // do nothing; user can navigate back
    }
  }, [items])

  async function handleCheckout() {
    setLoading(true)
    try {
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping: {}, email }),
      })
      const data = await resp.json()
      if (data.url) {
        // clear cart and redirect to Stripe Checkout
        clear()
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (e) {
      console.error(e)
      alert('Error creating checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <html>
      <body className="min-h-screen bg-gray-50">
        <Header cartCount={count()} />
        <main className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded">
              <label className="block text-sm">Email (receipt)</label>
              <input className="w-full border p-2 mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />

              <div className="mt-4">
                <h2 className="font-semibold">Shipping address</h2>
                <p className="text-sm text-gray-600">You can add shipping details later — this is a minimal MVP flow.</p>
              </div>

              <div className="mt-6">
                <button disabled={loading} onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'Creating...' : 'Pay with Stripe'}</button>
              </div>
            </div>
            <aside className="bg-white p-4 rounded">
              <div className="font-semibold">Order</div>
              <div className="mt-2">Items: {count()}</div>
            </aside>
          </div>
        </main>
      </body>
    </html>
  )
}
