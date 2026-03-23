import { Link, useParams } from 'react-router-dom'
import { MotionPage } from '../components/MotionPage'
import { useProducts } from '../state/useProducts'
import { useCart } from '../state/CartContext'
import { formatKes } from '../lib/money'
import styles from './Product.module.css'
import { TextInput } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { openTrackedPaymentLink } from '../lib/analytics'
import type { Review } from '../types'
import { seedReviews } from '../mock/seed'
import { useState } from 'react'

export function Product() {
  const { slug } = useParams()
  const { bySlug } = useProducts()
  const { add } = useCart()
  const rawProduct = slug ? bySlug.get(slug) : undefined
  const p = rawProduct?.status === 'active' ? rawProduct : undefined
  const paystackPaymentUrl = p?.paystackPaymentUrl?.trim()
  const initialReviews = seedReviews.filter((r) => r.productId === p?.id)
  const [reviews] = useState<Review[]>(initialReviews)

  return (
    <MotionPage>
      <div className="container">
        <div style={{ display: 'grid', gap: 14 }}>
          <section className="glass" style={{ padding: 22 }}>
            {!p ? (
              <>
                <h1 className="h1">Not found</h1>
                <p className="muted" style={{ marginTop: 10 }}>
                  That product doesn't exist (slug: {slug}).
                </p>
                <div style={{ marginTop: 14 }}>
                  <Link to="/shop" className="focusRing" style={{ color: 'var(--gold1)' }}>
                    Back to shop
                  </Link>
                </div>
              </>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <h1 className="h1">{p.title}</h1>
                  <div className="muted">{p.subtitle}</div>
                </div>

                <div
                  className={styles.grid}
                >
                  <div className={`${styles.coverPanel} glass`}>
                    <div className={styles.coverFrame}>
                      <img
                        className={styles.coverImage}
                        src={p.coverImage}
                        alt={`${p.title} cover`}
                        loading="eager"
                        decoding="async"
                        width={768}
                        height={1152}
                      />
                    </div>
                  </div>

                  <div className={styles.details}>
                    <div style={{ color: 'var(--text1)' }}>{p.description}</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 12,
                            padding: '6px 10px',
                            borderRadius: 999,
                            border: '1px solid rgba(214, 168, 74, 0.18)',
                            background: 'rgba(13, 26, 20, 0.35)',
                            color: 'rgba(246, 245, 242, 0.74)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        flexWrap: 'wrap',
                        marginTop: 4,
                      }}
                    >
                      <div style={{ color: 'rgba(242, 200, 107, 0.92)', fontWeight: 800 }}>
                        {formatKes(p.priceKes)}
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {paystackPaymentUrl ? (
                          <Button
                            onClick={() =>
                              openTrackedPaymentLink(paystackPaymentUrl, {
                                productId: p.id,
                                productTitle: p.title,
                                source: 'product_page',
                              })
                            }
                          >
                            Buy now
                          </Button>
                        ) : null}
                        <Button
                          variant={paystackPaymentUrl ? 'secondary' : 'primary'}
                          onClick={() => add(p, 1)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="glass" style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <h2 className="h2">What you'll learn</h2>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text1)' }}>
                    {p.whatYoullLearn.map((x) => (
                      <li key={x} style={{ marginBottom: 6 }}>
                        {x}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="glass" style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <h2 className="h2">Student reviews</h2>
                  {reviews.length === 0 ? (
                    <p className="muted">Be the first to leave a review after launch.</p>
                  ) : (
                    <div style={{ display: 'grid', gap: 10 }}>
                      {reviews.map((r) => (
                        <article
                          key={r.id}
                          style={{
                            padding: 12,
                            borderRadius: 16,
                            border: '1px solid rgba(214, 168, 74, 0.12)',
                            background: 'rgba(13, 26, 20, 0.35)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ color: 'var(--text0)', fontWeight: 700 }}>
                              {r.name}
                            </span>
                            <span style={{ color: 'rgba(242, 200, 107, 0.92)' }}>
                              {'\u2605'.repeat(r.rating)}
                            </span>
                          </div>
                          <p className="muted" style={{ fontSize: 13 }}>
                            {r.text}
                          </p>
                        </article>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: 6,
                      paddingTop: 10,
                      borderTop: '1px solid rgba(214, 168, 74, 0.14)',
                    }}
                  >
                    <p className="muted" style={{ fontSize: 12 }}>
                      Reviews shown here are from early readers. Verified buyer reviews will appear
                      here as the catalog grows.
                    </p>
                    <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                      <Field label="Review collection">
                        <TextInput value="Enabled after verified purchases" disabled readOnly />
                      </Field>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </section>
        </div>
      </div>
    </MotionPage>
  )
}

