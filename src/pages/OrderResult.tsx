import { Link, useParams } from 'react-router-dom'
import { MotionPage } from '../components/MotionPage'
import { Button } from '../components/ui/Button'
import { formatKes } from '../lib/money'
import { useOrders } from '../state/useOrders'

export function OrderResult() {
  const { orderId } = useParams()
  const { byId } = useOrders()
  const order = orderId ? byId.get(orderId) : undefined
  return (
    <MotionPage>
      <div className="container">
        <section className="glass" style={{ padding: 22 }}>
          {!order ? (
            <>
              <h1 className="h1">Order not found</h1>
              <p className="muted" style={{ marginTop: 10 }}>
                We couldn't find that order ID.
              </p>
              <div style={{ marginTop: 14 }}>
                <Link to="/shop">
                  <Button variant="secondary">Back to shop</Button>
                </Link>
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <h1 className="h1">Receipt</h1>
                <div className="muted" style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>
                  {order.id}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <Info label="Status" value={order.status.toUpperCase()} />
                <Info label="Amount" value={formatKes(order.subtotalKes)} />
                <Info label="Phone" value={order.mpesa.phone} />
                <Info
                  label="Reference"
                  value={order.mpesa.receipt ? order.mpesa.receipt : 'N/A'}
                />
              </div>

              <div className="glass" style={{ padding: 14, borderRadius: 18 }}>
                <div style={{ color: 'var(--text0)', fontWeight: 900, marginBottom: 10 }}>
                  Items
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {order.lines.map((l) => (
                    <div
                      key={`${l.productId}-${l.titleSnapshot}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 10,
                        padding: 10,
                        borderRadius: 16,
                        border: '1px solid rgba(214, 168, 74, 0.12)',
                        background: 'rgba(13, 26, 20, 0.35)',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: 'var(--text0)', fontWeight: 800 }}>
                          {l.titleSnapshot}
                        </div>
                        <div className="muted" style={{ fontSize: 12 }}>
                          Qty {l.qty} x {formatKes(l.unitPriceKesSnapshot)}
                        </div>
                      </div>
                      <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 900 }}>
                        {formatKes(l.qty * l.unitPriceKesSnapshot)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/shop">
                  <Button variant="secondary">Continue shopping</Button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </MotionPage>
  )
}

function Info(props: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 16,
        border: '1px solid rgba(214, 168, 74, 0.12)',
        background: 'rgba(13, 26, 20, 0.35)',
      }}
    >
      <div className="muted" style={{ fontSize: 12 }}>
        {props.label}
      </div>
      <div style={{ color: 'var(--text0)', fontWeight: 900, marginTop: 6 }}>{props.value}</div>
    </div>
  )
}

