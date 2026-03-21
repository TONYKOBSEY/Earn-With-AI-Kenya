import { Link } from 'react-router-dom'
import { MotionPage } from '../components/MotionPage'
import { formatKes } from '../lib/money'
import { useCart } from '../state/CartContext'
import { useProducts } from '../state/useProducts'

export function Cart() {
  const cart = useCart()
  const { products } = useProducts()
  const productsById = new Map(products.map((p) => [p.id, p]))

  return (
    <MotionPage>
      <div className="container">
        <div style={{ display: 'grid', gap: 14 }}>
          <section className="glass" style={{ padding: 22 }}>
            <h1 className="h1">Cart</h1>
            <p className="muted" style={{ marginTop: 10 }}>
              {cart.itemsCount === 0
                ? 'Your cart is empty.'
                : `${cart.itemsCount} item${cart.itemsCount === 1 ? '' : 's'} in your cart.`}
            </p>
          </section>

          {cart.items.length === 0 ? (
            <section className="glass" style={{ padding: 18 }}>
              <Link to="/shop" className="focusRing" style={{ color: 'var(--gold1)' }}>
                Browse ebooks
              </Link>
            </section>
          ) : (
            <>
              <section className="glass" style={{ padding: 14 }}>
                <div style={{ display: 'grid', gap: 12 }}>
                  {cart.items.map((item) => {
                    const p = productsById.get(item.productId)
                    if (!p) return null
                    return (
                      <div
                        key={item.productId}
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
                          loading="lazy"
                          decoding="async"
                          style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: 'var(--text0)', fontWeight: 700 }}>
                            {p.title}
                          </div>
                          <div className="muted" style={{ fontSize: 13 }}>
                            {formatKes(item.unitPriceKesSnapshot)} each
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="muted" style={{ fontSize: 12 }}>
                                Qty
                              </span>
                              <input
                                className="focusRing"
                                value={item.qty}
                                onChange={(e) => cart.setQty(item.productId, Number(e.target.value))}
                                inputMode="numeric"
                                type="number"
                                min={1}
                                max={99}
                                style={{
                                  width: 76,
                                  padding: '8px 10px',
                                  borderRadius: 12,
                                  border: '1px solid rgba(214, 168, 74, 0.18)',
                                  background: 'rgba(5, 11, 8, 0.55)',
                                  color: 'var(--text0)',
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              className="focusRing"
                              onClick={() => cart.remove(item.productId)}
                              style={{
                                cursor: 'pointer',
                                padding: '8px 10px',
                                borderRadius: 12,
                                border: '1px solid rgba(214, 168, 74, 0.18)',
                                background: 'rgba(5, 11, 8, 0.35)',
                                color: 'rgba(246, 245, 242, 0.78)',
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 800 }}>
                          {formatKes(item.qty * item.unitPriceKesSnapshot)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

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
                  <div className="muted" style={{ fontSize: 12 }}>
                    Subtotal
                  </div>
                  <div style={{ color: 'var(--text0)', fontWeight: 900, fontSize: 18 }}>
                    {formatKes(cart.subtotalKes)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="focusRing"
                    onClick={() => cart.clear()}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 14px',
                      borderRadius: 999,
                      border: '1px solid rgba(214, 168, 74, 0.16)',
                      background: 'rgba(13, 26, 20, 0.45)',
                      color: 'rgba(246, 245, 242, 0.8)',
                    }}
                  >
                    Clear
                  </button>
                  <Link
                    to="/checkout"
                    className="focusRing"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 14px',
                      borderRadius: 999,
                      border: '1px solid rgba(214, 168, 74, 0.35)',
                      background:
                        'linear-gradient(180deg, rgba(214, 168, 74, 0.22), rgba(214, 168, 74, 0.08))',
                      color: 'rgba(246, 245, 242, 0.92)',
                      fontWeight: 800,
                    }}
                  >
                    Checkout
                  </Link>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </MotionPage>
  )
}

