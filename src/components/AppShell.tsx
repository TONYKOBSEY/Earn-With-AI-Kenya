import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

import styles from './AppShell.module.css'
import { useCart } from '../state/CartContext'
import { CartDrawer } from './CartDrawer'

function BrandMark() {
  return (
    <div className={styles.brandMark} aria-hidden="true">
      <div className={styles.orb} />
      <div className={styles.ring} />
    </div>
  )
}

export function AppShell() {
  const cart = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={`${styles.headerInner} container`}>
          <NavLink to="/" className={`${styles.brand} focusRing`}>
            <BrandMark />
            <div className={styles.brandText}>
              <div className={styles.brandTitle}>Earn with AI Kenya</div>
              <div className={styles.brandTag}>Afro-futuristic ebooks for real income</div>
            </div>
          </NavLink>

          <nav className={styles.nav} aria-label="Primary">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${styles.navLink} focusRing ${isActive ? styles.navActive : ''}`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.navLink} focusRing ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.cartNavLabel}>
                Cart
                {cart.itemsCount > 0 ? (
                  <span className={styles.badge} aria-label={`${cart.itemsCount} items in cart`}>
                    {cart.itemsCount}
                  </span>
                ) : null}
              </span>
            </NavLink>
          </nav>

          <button
            type="button"
            className={`${styles.cartPeek} focusRing`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open cart"
          >
            <span>Cart</span>
            {cart.itemsCount > 0 ? <span className={styles.badge}>{cart.itemsCount}</span> : null}
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerLine}>
              Built for Kenya. Secure checkout opens on Paystack.
            </div>
            <div className={styles.footerLineMuted}>
              Copyright {new Date().getFullYear()} Earn with AI Kenya
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

