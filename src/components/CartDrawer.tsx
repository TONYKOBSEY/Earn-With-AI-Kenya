import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatKes } from '../lib/money'
import { useCart } from '../state/CartContext'
import { useProducts } from '../state/useProducts'

export function CartDrawer(props: { open: boolean; onClose: () => void }) {
  const cart = useCart()
  const { products } = useProducts()
  const productsById = new Map(products.map((p) => [p.id, p]))

  return (
    <AnimatePresence>
      {props.open ? (
        <>
          <motion.div
            aria-hidden="true"
            onClick={props.onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 60,
            }}
          />
          <motion.aside
            role="dialog"
            aria-label="Cart"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: 'min(420px, 92vw)',
              zIndex: 70,
              background: 'rgba(7, 19, 15, 0.92)',
              borderLeft: '1px solid rgba(214, 168, 74, 0.18)',
              backdropFilter: 'blur(12px)',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
            }}
          >
            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Cart</div>
                <div className="muted" style={{ fontSize: 12 }}>
                  {cart.itemsCount} item{cart.itemsCount === 1 ? '' : 's'}
                </div>
              </div>
              <button
                type="button"
                className="focusRing"
                onClick={props.onClose}
                style={{
                  cursor: 'pointer',
                  padding: '10px 12px',
                  borderRadius: 12,
                  border: '1px solid rgba(214, 168, 74, 0.18)',
                  background: 'rgba(5, 11, 8, 0.35)',
                  color: 'rgba(246, 245, 242, 0.85)',
                }}
              >
                Close
              </button>
            </div>

            <div style={{ padding: 16, overflow: 'auto', display: 'grid', gap: 10 }}>
              {cart.items.length === 0 ? (
                <div className="muted">Your cart is empty.</div>
              ) : (
                cart.items.map((i) => {
                  const p = productsById.get(i.productId)
                  if (!p) return null
                  return (
                    <div
                      key={i.productId}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '44px 1fr auto',
                        gap: 10,
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
                        style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: 'var(--text0)', fontSize: 13, fontWeight: 800 }}>
                          {p.title}
                        </div>
                        <div className="muted" style={{ fontSize: 12 }}>
                          Qty {i.qty}
                        </div>
                      </div>
                      <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 900 }}>
                        {formatKes(i.qty * i.unitPriceKesSnapshot)}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div
              style={{
                padding: 16,
                borderTop: '1px solid rgba(214, 168, 74, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div className="muted" style={{ fontSize: 12 }}>
                  Subtotal
                </div>
                <div style={{ color: 'var(--text0)', fontWeight: 900 }}>
                  {formatKes(cart.subtotalKes)}
                </div>
              </div>
              <Link
                to="/checkout"
                className="focusRing"
                onClick={props.onClose}
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
                  fontWeight: 900,
                }}
              >
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

