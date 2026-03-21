/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readJson, writeJson } from '../lib/storage'
import type { CartItem, Product } from '../types'

type CartState = {
  items: CartItem[]
  itemsCount: number
  subtotalKes: number
  add: (product: Product, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
}

const STORAGE_KEY = 'ewaik_cart_v1'

const CartContext = createContext<CartState | null>(null)

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1
  return Math.max(1, Math.min(99, Math.round(qty)))
}

export function CartProvider(props: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readJson<CartItem[]>(STORAGE_KEY, []))

  useEffect(() => {
    writeJson(STORAGE_KEY, items)
  }, [items])

  const itemsCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotalKes = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.unitPriceKesSnapshot, 0),
    [items],
  )

  function add(product: Product, qty = 1) {
    const q = clampQty(qty)
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.productId === product.id)
      if (idx === -1) {
        return [
          { productId: product.id, qty: q, unitPriceKesSnapshot: product.priceKes },
          ...prev,
        ]
      }
      const next = prev.slice()
      next[idx] = { ...next[idx], qty: clampQty(next[idx].qty + q) }
      return next
    })
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((p) => p.productId !== productId))
  }

  function setQty(productId: string, qty: number) {
    const q = clampQty(qty)
    setItems((prev) => prev.map((p) => (p.productId === productId ? { ...p, qty: q } : p)))
  }

  function clear() {
    setItems([])
  }

  const value: CartState = useMemo(
    () => ({ items, itemsCount, subtotalKes, add, remove, setQty, clear }),
    [items, itemsCount, subtotalKes],
  )

  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
}

export function useCart(): CartState {
  const v = useContext(CartContext)
  if (!v) throw new Error('useCart must be used within CartProvider')
  return v
}

