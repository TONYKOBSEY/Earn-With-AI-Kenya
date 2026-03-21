import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MotionPage } from '../components/MotionPage'
import { Button } from '../components/ui/Button'
import { formatKes } from '../lib/money'
import { useCart } from '../state/CartContext'
import { useProducts } from '../state/useProducts'
import styles from './Checkout.module.css'

type CheckoutItem = {
  productId: string
  qty: number
  unitPriceKesSnapshot: number
  title: string
  coverImage: string
  paystackPaymentUrl: string | undefined
}

export function Checkout() {
  const cart = useCart()
  const { products } = useProducts()

  const productsById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products])

  const checkoutItems = useMemo<CheckoutItem[]>(
    () =>
      cart.items
        .map((item) => {
          const product = productsById.get(item.productId)
          if (!product) return null
          return {
            productId: item.productId,
            qty: item.qty,
            unitPriceKesSnapshot: item.unitPriceKesSnapshot,
            title: product.title,
            coverImage: product.coverImage,
            paystackPaymentUrl: product.paystackPaymentUrl?.trim() || undefined,
          }
        })
        .filter((item): item is CheckoutItem => Boolean(item)),
    [cart.items, productsById],
  )

  const linkedItems = checkoutItems.filter((item) => item.paystackPaymentUrl)
  const missingLinkItems = checkoutItems.filter((item) => !item.paystackPaymentUrl)
  const singleLinkedItem =
    checkoutItems.length === 1 && linkedItems.length === 1 ? linkedItems[0] : undefined

  function openPaymentLink(url: string) {
    window.location.assign(url)
  }

  return (
    <MotionPage>
      <div className="container">
        <div style={{ display: 'grid', gap: 14 }}>
          <section className="glass" style={{ padding: 22 }}>
            <h1 className="h1">Checkout</h1>
            <p className="muted" style={{ marginTop: 10, maxWidth: 760 }}>
              Each ebook opens on its own secure Paystack payment page. For launch, use the live
              Paystack link connected to each product.
            </p>
          </section>

          {cart.items.length === 0 ? (
            <section className="glass" style={{ padding: 18 }}>
              <div className="muted">Your cart is empty.</div>
              <div style={{ marginTop: 12 }}>
                <Link to="/shop">
                  <Button variant="secondary">Browse ebooks</Button>
                </Link>
              </div>
            </section>
          ) : (
            <>
              <section className="glass" style={{ padding: 18, display: 'grid', gap: 14 }}>
                <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Order summary</div>

                <div style={{ display: 'grid', gap: 10 }}>
                  {checkoutItems.map((item) => (
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
                        src={item.coverImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: 'var(--text0)', fontWeight: 800 }}>{item.title}</div>
                        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                          Qty {item.qty} x {formatKes(item.unitPriceKesSnapshot)}
                        </div>
                        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                          {item.paystackPaymentUrl ? 'Paystack link ready' : 'Paystack link missing'}
                        </div>
                      </div>
                      <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 900 }}>
                        {formatKes(item.qty * item.unitPriceKesSnapshot)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {singleLinkedItem ? (
                <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Ready for secure checkout</div>
                  <div className={styles.grid2}>
                    <div
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        border: '1px solid rgba(214, 168, 74, 0.12)',
                        background: 'rgba(13, 26, 20, 0.35)',
                      }}
                    >
                      <div className="muted" style={{ fontSize: 12 }}>
                        Product
                      </div>
                      <div style={{ color: 'var(--text0)', fontWeight: 900, marginTop: 6 }}>
                        {singleLinkedItem.title}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        border: '1px solid rgba(214, 168, 74, 0.12)',
                        background: 'rgba(13, 26, 20, 0.35)',
                      }}
                    >
                      <div className="muted" style={{ fontSize: 12 }}>
                        Total
                      </div>
                      <div style={{ color: 'var(--text0)', fontWeight: 900, marginTop: 6 }}>
                        {formatKes(singleLinkedItem.qty * singleLinkedItem.unitPriceKesSnapshot)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Button onClick={() => openPaymentLink(singleLinkedItem.paystackPaymentUrl!)}>
                      Proceed to Paystack
                    </Button>
                    <Link to="/cart">
                      <Button variant="secondary">Back to cart</Button>
                    </Link>
                  </div>
                </section>
              ) : null}

              {linkedItems.length > 1 ? (
                <section className="glass" style={{ padding: 18, display: 'grid', gap: 12 }}>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Pay one ebook at a time</div>
                  <p className="muted" style={{ margin: 0, maxWidth: 760 }}>
                    Your live Paystack setup is currently product-based, so each ebook opens its
                    own secure payment page. Complete each purchase separately.
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {linkedItems.map((item) => (
                      <Button
                        key={item.productId}
                        onClick={() => openPaymentLink(item.paystackPaymentUrl!)}
                      >
                        Pay for {item.title}
                      </Button>
                    ))}
                  </div>
                </section>
              ) : null}

              {missingLinkItems.length > 0 ? (
                <section className="glass" style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>Action needed before checkout</div>
                  <p className="muted" style={{ margin: 0, maxWidth: 760 }}>
                    The following products do not have a live Paystack payment link connected yet:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text1)' }}>
                    {missingLinkItems.map((item) => (
                      <li key={item.productId}>{item.title}</li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link to="/cart">
                      <Button variant="secondary">Review cart</Button>
                    </Link>
                    <Link to="/shop">
                      <Button variant="secondary">Back to shop</Button>
                    </Link>
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </div>
    </MotionPage>
  )
}
