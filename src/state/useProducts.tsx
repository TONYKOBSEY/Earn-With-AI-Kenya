import { useMemo, useState } from 'react'
import { seedProducts } from '../mock/seed'
import { readJson, safeNowIso, writeJson } from '../lib/storage'
import type { Product } from '../types'
import { useEffect } from 'react'

const STORAGE_KEY = 'ewaik_products_override_v1'

type ProductOverride = Partial<Omit<Product, 'id'>> & { id: string }
type OverridesState = { byId: Record<string, ProductOverride> }

function readOverrides(): OverridesState {
  return readJson<OverridesState>(STORAGE_KEY, { byId: {} })
}

function writeOverrides(next: OverridesState) {
  writeJson(STORAGE_KEY, next)
}

export function useProducts() {
  const [overrides, setOverrides] = useState<OverridesState>(() => readOverrides())

  useEffect(() => {
    const onSync = () => setOverrides(readOverrides())
    window.addEventListener('storage', onSync)
    window.addEventListener('ewaik-storage', onSync)
    return () => {
      window.removeEventListener('storage', onSync)
      window.removeEventListener('ewaik-storage', onSync)
    }
  }, [])

  const products = useMemo(() => {
    const byId = new Map(seedProducts.map((p) => [p.id, p]))
    for (const [id, patch] of Object.entries(overrides.byId)) {
      const base = byId.get(id)
      if (base) byId.set(id, { ...base, ...patch })
    }
    return Array.from(byId.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [overrides])

  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products])
  const activeProducts = useMemo(
    () => products.filter((p) => p.status === 'active'),
    [products],
  )

  function upsertProduct(product: Product) {
    const next = readOverrides()
    next.byId[product.id] = { ...product, updatedAt: safeNowIso() }
    writeOverrides(next)
    setOverrides(next)
  }

  function patchProduct(id: string, patch: Partial<Product>) {
    const next = readOverrides()
    const prev = next.byId[id] ?? { id }
    next.byId[id] = { ...prev, ...patch, id, updatedAt: safeNowIso() }
    writeOverrides(next)
    setOverrides(next)
  }

  return {
    products,
    activeProducts,
    bySlug,
    upsertProduct,
    patchProduct,
    storageKey: STORAGE_KEY,
  }
}

