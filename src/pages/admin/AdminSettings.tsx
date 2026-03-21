import { MotionPage } from '../../components/MotionPage'
import { useState } from 'react'
import { removeKey } from '../../lib/storage'
import { useAdminGate } from '../../state/useAdminGate'
import { useOrders } from '../../state/useOrders'
import { useProducts } from '../../state/useProducts'

export function AdminSettings() {
  const gate = useAdminGate()
  const orders = useOrders()
  const products = useProducts()
  const [newPin, setNewPin] = useState('')

  return (
    <MotionPage>
      <div style={{ display: 'grid', gap: 14 }}>
        <section className="glass" style={{ padding: 18 }}>
          <h2 className="h2">Settings</h2>
          <div className="muted" style={{ marginTop: 8 }}>
            Everything here is stored in this browser.
          </div>
        </section>

        <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
          <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Admin PIN</div>
          <div className="muted" style={{ fontSize: 13 }}>
            This PIN is stored in the browser and is not a replacement for real admin auth.
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="focusRing"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="New PIN (min 4 digits)"
              inputMode="numeric"
              style={inputStyle}
            />
            <button
              type="button"
              className="focusRing"
              onClick={() => {
                gate.setPin(newPin)
                setNewPin('')
              }}
              style={primaryBtn}
            >
              Set PIN
            </button>
          </div>
        </section>

        <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
          <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Browser data</div>
          <div className="muted" style={{ fontSize: 13 }}>
            Clear stored orders and product overrides. Seed data will remain.
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="focusRing"
              onClick={() => orders.clearOrders()}
              style={dangerBtn}
            >
              Clear orders
            </button>
            <button
              type="button"
              className="focusRing"
              onClick={() => {
                removeKey(products.storageKey)
                window.location.reload()
              }}
              style={dangerBtn}
            >
              Reset products overrides
            </button>
          </div>
        </section>
      </div>
    </MotionPage>
  )
}

const inputStyle: React.CSSProperties = {
  width: 220,
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

const dangerBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '10px 12px',
  borderRadius: 999,
  border: '1px solid rgba(255, 92, 92, 0.35)',
  background: 'rgba(255, 92, 92, 0.08)',
  color: 'rgba(246, 245, 242, 0.88)',
  fontWeight: 800,
}

