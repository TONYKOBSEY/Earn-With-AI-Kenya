import { useEffect, useMemo, useState } from 'react'
import { readJson, safeNowIso, writeJson } from '../lib/storage'
import { createMpesaReceipt, createOrderId } from '../lib/id'
import type { BuyerInfo, CartItem, Order, OrderLine, OrderStatus, Product } from '../types'

const STORAGE_KEY = 'ewaik_orders_v1'

function readOrders(): Order[] {
  return readJson<Order[]>(STORAGE_KEY, [])
}

function writeOrders(next: Order[]) {
  writeJson(STORAGE_KEY, next)
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => readOrders())

  useEffect(() => {
    const onSync = () => setOrders(readOrders())
    window.addEventListener('storage', onSync)
    window.addEventListener('ewaik-storage', onSync)
    return () => {
      window.removeEventListener('storage', onSync)
      window.removeEventListener('ewaik-storage', onSync)
    }
  }, [])

  const byId = useMemo(() => new Map(orders.map((o) => [o.id, o])), [orders])

  function createOrder(args: {
    status: OrderStatus
    buyer: BuyerInfo
    cart: CartItem[]
    productsById: Map<string, Product>
  }): Order {
    const lines: OrderLine[] = args.cart
      .map((ci) => {
        const p = args.productsById.get(ci.productId)
        if (!p) return null
        return {
          productId: ci.productId,
          titleSnapshot: p.title,
          qty: ci.qty,
          unitPriceKesSnapshot: ci.unitPriceKesSnapshot,
        }
      })
      .filter((x): x is OrderLine => Boolean(x))

    const subtotalKes = lines.reduce((sum, l) => sum + l.qty * l.unitPriceKesSnapshot, 0)
    const createdAt = safeNowIso()

    const order: Order = {
      id: createOrderId(),
      createdAt,
      status: args.status,
      buyer: args.buyer,
      lines,
      subtotalKes,
      paymentMethod: 'mpesa_stk_sim',
      mpesa: {
        phone: args.buyer.phone,
        receipt: args.status === 'paid' ? createMpesaReceipt() : undefined,
      },
    }

    const next = [order, ...readOrders()]
    writeOrders(next)
    setOrders(next)
    return order
  }

  function clearOrders() {
    writeOrders([])
    setOrders([])
  }

  return { orders, byId, createOrder, clearOrders, storageKey: STORAGE_KEY }
}

