import { NavLink, Outlet } from 'react-router-dom'
import { MotionPage } from '../../components/MotionPage'
import { useState } from 'react'
import { useAdminGate } from '../../state/useAdminGate'

export function AdminLayout() {
  const gate = useAdminGate()
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <MotionPage>
      <div className="container">
        <div style={{ display: 'grid', gap: 14 }}>
          <section className="glass" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h1 className="h2">Admin</h1>
                <div className="muted" style={{ marginTop: 4, fontSize: 13 }}>
                  Browser-managed dashboard
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {gate.unlocked ? (
                  <>
                    <nav style={{ display: 'flex', gap: 8 }} aria-label="Admin">
                      <AdminTab to="/admin" end>
                        Overview
                      </AdminTab>
                      <AdminTab to="/admin/products">Products</AdminTab>
                      <AdminTab to="/admin/orders">Orders</AdminTab>
                      <AdminTab to="/admin/settings">Settings</AdminTab>
                    </nav>
                    <button
                      type="button"
                      className="focusRing"
                      onClick={() => gate.lock()}
                      style={{
                        cursor: 'pointer',
                        padding: '10px 12px',
                        borderRadius: 999,
                        border: '1px solid rgba(214, 168, 74, 0.16)',
                        background: 'rgba(13, 26, 20, 0.45)',
                        color: 'rgba(246, 245, 242, 0.8)',
                        fontWeight: 800,
                      }}
                    >
                      Lock
                    </button>
                  </>
                ) : (
                  <div className="muted" style={{ fontSize: 12 }}>
                    Locked
                  </div>
                )}
              </div>
            </div>
          </section>

          {!gate.unlocked ? (
            <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
              <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Enter admin PIN</div>
              <div className="muted" style={{ fontSize: 13 }}>
                This dashboard is protected by a browser-stored PIN. Default PIN is{' '}
                <span style={{ fontFamily: 'var(--mono)' }}>{gate.defaultPin}</span>.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  className="focusRing"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  inputMode="numeric"
                  type="password"
                  style={{
                    width: 180,
                    padding: '10px 12px',
                    borderRadius: 14,
                    border: '1px solid rgba(214, 168, 74, 0.18)',
                    background: 'rgba(5, 11, 8, 0.55)',
                    color: 'var(--text0)',
                  }}
                />
                <button
                  type="button"
                  className="focusRing"
                  onClick={() => {
                    const ok = gate.unlock(pin)
                    setError(ok ? null : 'Wrong PIN')
                    if (ok) setPin('')
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '12px 14px',
                    borderRadius: 999,
                    border: '1px solid rgba(214, 168, 74, 0.35)',
                    background:
                      'linear-gradient(180deg, rgba(214, 168, 74, 0.22), rgba(214, 168, 74, 0.08))',
                    color: 'rgba(246, 245, 242, 0.92)',
                    fontWeight: 900,
                  }}
                >
                  Unlock
                </button>
                {error ? (
                  <span style={{ color: 'rgba(255, 92, 92, 0.9)', fontSize: 13 }}>{error}</span>
                ) : null}
              </div>
            </section>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </MotionPage>
  )
}

function AdminTab(props: { to: string; end?: boolean; children: React.ReactNode }) {
  return (
    <NavLink
      to={props.to}
      end={props.end}
      className={({ isActive }) =>
        `focusRing ${isActive ? 'adminTabActive' : 'adminTab'}`
      }
    >
      {props.children}
    </NavLink>
  )
}

