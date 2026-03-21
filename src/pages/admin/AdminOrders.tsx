import { MotionPage } from '../../components/MotionPage'
import { formatKes } from '../../lib/money'
import { useOrders } from '../../state/useOrders'

export function AdminOrders() {
  const { orders, clearOrders } = useOrders()

  return (
    <MotionPage>
      <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="h2">Orders</h2>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              Orders shown here are stored in this browser.
            </div>
          </div>
          <button
            type="button"
            className="focusRing"
            onClick={() => clearOrders()}
            style={{
              cursor: 'pointer',
              padding: '10px 12px',
              borderRadius: 999,
              border: '1px solid rgba(255, 92, 92, 0.35)',
              background: 'rgba(255, 92, 92, 0.08)',
              color: 'rgba(246, 245, 242, 0.88)',
              fontWeight: 800,
            }}
          >
            Clear all
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="muted">No orders stored yet.</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {orders.map((o) => (
              <div
                key={o.id}
                style={{
                  padding: 12,
                  borderRadius: 16,
                  border: '1px solid rgba(214, 168, 74, 0.12)',
                  background: 'rgba(13, 26, 20, 0.35)',
                  display: 'grid',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>{o.id}</div>
                  <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 900 }}>
                    {formatKes(o.subtotalKes)}
                  </div>
                </div>
                <div className="muted" style={{ fontSize: 12, fontFamily: 'var(--mono)' }}>
                  {new Date(o.createdAt).toLocaleString()}
                </div>
                <div className="muted" style={{ fontSize: 12 }}>
                  Status: <strong style={{ color: 'var(--text0)' }}>{o.status}</strong> | Phone:{' '}
                  <span style={{ fontFamily: 'var(--mono)' }}>{maskPhone(o.buyer.phone)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </MotionPage>
  )
}

function maskPhone(phone: string): string {
  const p = phone.replace(/\s+/g, '')
  if (p.length <= 4) return '****'
  const tail = p.slice(-3)
  return `***${tail}`
}

