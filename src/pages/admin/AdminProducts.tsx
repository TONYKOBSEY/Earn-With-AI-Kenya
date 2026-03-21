import { MotionPage } from '../../components/MotionPage'
import { useMemo, useState } from 'react'
import { createProductId } from '../../lib/id'
import { formatKes } from '../../lib/money'
import { useProducts } from '../../state/useProducts'
import type { Product, ProductStatus } from '../../types'

export function AdminProducts() {
  const { products, upsertProduct, patchProduct } = useProducts()
  const [editingId, setEditingId] = useState<string | null>(null)

  const productsById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])
  const editing = editingId ? productsById.get(editingId) : undefined

  return (
    <MotionPage>
      <div style={{ display: 'grid', gap: 14 }}>
        <section
          className="glass"
          style={{
            padding: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 className="h2">Products</h2>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              Changes here are stored in this browser until you publish them elsewhere.
            </div>
          </div>
          <button
            type="button"
            className="focusRing"
            onClick={() => {
              const id = createProductId()
              const now = new Date().toISOString()
              const p: Product = {
                id,
                slug: `new-ebook-${id.slice(-6)}`,
                title: 'New ebook',
                subtitle: 'Short subtitle',
                priceKes: 499,
                paystackPaymentUrl: '',
                coverImage: '/assets/cover-optimized.jpg',
                description: 'Describe what this ebook helps the buyer achieve.',
                bullets: ['Key outcome #1', 'Key outcome #2', 'Key outcome #3'],
                whatYoullLearn: ['Module 1', 'Module 2', 'Module 3'],
                tags: ['AI', 'Kenya'],
                ratingAvg: 4.6,
                ratingCount: 0,
                status: 'draft',
                updatedAt: now,
              }
              upsertProduct(p)
              setEditingId(id)
            }}
            style={primaryBtn}
          >
            Add ebook
          </button>
        </section>

        <section className="glass" style={{ padding: 14 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto',
                  gap: 12,
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 16,
                  border: '1px solid rgba(214, 168, 74, 0.12)',
                  background: 'rgba(13, 26, 20, 0.35)',
                }}
              >
                <img
                  src={p.coverImage}
                  alt=""
                  style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>{p.title}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                    {p.status.toUpperCase()} | {formatKes(p.priceKes)} |{' '}
                    <span style={{ fontFamily: 'var(--mono)' }}>{p.slug}</span>
                  </div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                    {p.paystackPaymentUrl?.trim() ? 'Paystack link connected' : 'No Paystack link yet'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="focusRing"
                    onClick={() => setEditingId(p.id)}
                    style={secondaryBtn}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="focusRing"
                    onClick={() => patchProduct(p.id, { status: p.status === 'archived' ? 'draft' : 'archived' })}
                    style={dangerBtn}
                  >
                    {p.status === 'archived' ? 'Unarchive' : 'Archive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {editing ? (
          <ProductEditor product={editing} onClose={() => setEditingId(null)} onSave={upsertProduct} />
        ) : null}
      </div>
    </MotionPage>
  )
}

function ProductEditor(props: {
  product: Product
  onClose: () => void
  onSave: (p: Product) => void
}) {
  const [draft, setDraft] = useState<Product>(props.product)

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setDraft((p) => ({ ...p, [key]: value }))
  }

  return (
    <section className="glass" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h2 className="h2">Edit product</h2>
          <div className="muted" style={{ marginTop: 6, fontSize: 12, fontFamily: 'var(--mono)' }}>
            {draft.id}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="focusRing" onClick={props.onClose} style={secondaryBtn}>
            Close
          </button>
          <button
            type="button"
            className="focusRing"
            onClick={() => {
              props.onSave({ ...draft, updatedAt: new Date().toISOString() })
              props.onClose()
            }}
            style={primaryBtn}
          >
            Save
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
        <Grid2>
          <Field label="Title">
            <input className="focusRing" value={draft.title} onChange={(e) => set('title', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Price (KES)">
            <input
              className="focusRing"
              value={draft.priceKes}
              onChange={(e) => set('priceKes', Number(e.target.value))}
              type="number"
              inputMode="numeric"
              min={0}
              style={inputStyle}
            />
          </Field>
        </Grid2>

        <Grid2>
          <Field label="Subtitle">
            <input className="focusRing" value={draft.subtitle} onChange={(e) => set('subtitle', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Slug">
            <input className="focusRing" value={draft.slug} onChange={(e) => set('slug', e.target.value)} style={inputStyle} />
          </Field>
        </Grid2>

        <Grid2>
          <Field label="Status">
            <select
              className="focusRing"
              value={draft.status}
              onChange={(e) => set('status', e.target.value as ProductStatus)}
              style={inputStyle}
            >
              <option value="active">active</option>
              <option value="draft">draft</option>
              <option value="archived">archived</option>
            </select>
          </Field>
          <Field label="Paystack payment URL">
            <input
              className="focusRing"
              value={draft.paystackPaymentUrl ?? ''}
              onChange={(e) => set('paystackPaymentUrl', e.target.value)}
              placeholder="https://paystack.com/pay/your-live-link"
              style={inputStyle}
            />
          </Field>
        </Grid2>

        <Grid2>
          <Field label="Cover image (URL path)">
            <input
              className="focusRing"
              value={draft.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              style={inputStyle}
            />
          </Field>
        </Grid2>

        <Field label="Description">
          <textarea
            className="focusRing"
            value={draft.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </Field>

        <Field label="Tags (comma separated)">
          <input
            className="focusRing"
            value={draft.tags.join(', ')}
            onChange={(e) =>
              set(
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean),
              )
            }
            style={inputStyle}
          />
        </Field>
      </div>
    </section>
  )
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span className="muted" style={{ fontSize: 12 }}>
        {props.label}
      </span>
      {props.children}
    </label>
  )
}

function Grid2(props: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{props.children}</div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 14,
  border: '1px solid rgba(214, 168, 74, 0.18)',
  background: 'rgba(5, 11, 8, 0.55)',
  color: 'var(--text0)',
}

const primaryBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '12px 14px',
  borderRadius: 999,
  border: '1px solid rgba(214, 168, 74, 0.35)',
  background: 'linear-gradient(180deg, rgba(214, 168, 74, 0.22), rgba(214, 168, 74, 0.08))',
  color: 'rgba(246, 245, 242, 0.92)',
  fontWeight: 900,
}

const secondaryBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '10px 12px',
  borderRadius: 999,
  border: '1px solid rgba(214, 168, 74, 0.16)',
  background: 'rgba(13, 26, 20, 0.45)',
  color: 'rgba(246, 245, 242, 0.8)',
  fontWeight: 800,
}

const dangerBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '10px 12px',
  borderRadius: 999,
  border: '1px solid rgba(255, 92, 92, 0.35)',
  background: 'rgba(255, 92, 92, 0.08)',
  color: 'rgba(246, 245, 242, 0.88)',
  fontWeight: 800,
}

