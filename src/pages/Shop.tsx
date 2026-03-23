import { useMemo, useState } from 'react'
import { MotionPage } from '../components/MotionPage'
import { ProductCard } from '../components/ProductCard'
import { Button } from '../components/ui/Button'
import { TextInput } from '../components/ui/Input'
import { useProducts } from '../state/useProducts'

export function Shop() {
  const { activeProducts } = useProducts()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | 'all'>('all')

  const tags = useMemo(() => {
    const set = new Set<string>()
    activeProducts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [activeProducts])

  const filtered = useMemo(
    () =>
      activeProducts.filter((p) => {
        const q = query.trim().toLowerCase()
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        const matchesTag = tag === 'all' || p.tags.includes(tag)
        return matchesQuery && matchesTag
      }),
    [activeProducts, query, tag],
  )

  return (
    <MotionPage>
      <div className="container">
        <div style={{ display: 'grid', gap: 14 }}>
          <section className="glass" style={{ padding: 22, display: 'grid', gap: 12 }}>
            <h1 className="h1">Shop</h1>
            <p className="muted" style={{ marginTop: 10, maxWidth: 720 }}>
              Browse practical AI guides built for Kenya. Use Buy now for direct Paystack payment,
              or choose Checkout to add the product and continue through the Paystack-backed
              checkout flow.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <TextInput
                placeholder="Search by title, topic, or tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ maxWidth: 260 }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <Button
                  variant={tag === 'all' ? 'primary' : 'secondary'}
                  onClick={() => setTag('all')}
                >
                  All tags
                </Button>
                {tags.map((t) => (
                  <Button
                    key={t}
                    variant={tag === t ? 'primary' : 'secondary'}
                    onClick={() => setTag(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 14,
            }}
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        </div>
      </div>
    </MotionPage>
  )
}

