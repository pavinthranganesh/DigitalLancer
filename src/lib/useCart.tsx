'use client'

import { useEffect, useState } from 'react'

const CART_KEY = 'dl_cart_v1'

export function useCart() {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      setItems(raw ? JSON.parse(raw) : [])
    } catch (e) {
      setItems([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  function add(item) {
    setItems((prev) => {
      const found = prev.find((p) => p.bookId === item.bookId)
      if (found) return prev.map((p) => p.bookId === item.bookId ? { ...p, quantity: p.quantity + item.quantity } : p)
      return [...prev, item]
    })
  }

  function update(bookId, quantity) {
    setItems((prev) => prev.map((p) => p.bookId === bookId ? { ...p, quantity } : p))
  }

  function remove(bookId) {
    setItems((prev) => prev.filter((p) => p.bookId !== bookId))
  }

  function clear() {
    setItems([])
  }

  function count() {
    return items.reduce((s, i) => s + i.quantity, 0)
  }

  return { items, add, update, remove, clear, count }
}
