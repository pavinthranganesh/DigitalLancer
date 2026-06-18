import React from 'react'

export default function Header({ cartCount = 0 }) {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-semibold">DigitalLancer</a>
        <nav className="flex gap-4 items-center">
          <a href="/books" className="text-sm text-gray-700">Books</a>
          <a href="/cart" className="text-sm text-gray-700">Cart ({cartCount})</a>
        </nav>
      </div>
    </header>
  )
}
