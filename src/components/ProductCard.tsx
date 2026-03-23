import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../types'
import { openTrackedPaymentLink } from '../lib/analytics'
import { formatKes } from '../lib/money'
import { useCart } from '../state/CartContext'
import styles from './ProductCard.module.css'

export function ProductCard(props: { product: Product }) {
  const { add } = useCart()
  const navigate = useNavigate()
  const p = props.product
  const paystackPaymentUrl = p.paystackPaymentUrl?.trim()

  return (
    <motion.article
      className={`${styles.card} glass`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
    >
      <Link to={`/p/${p.slug}`} className={`${styles.media} focusRing`}>
        <img
          className={styles.cover}
          src={p.coverImage}
          alt={`${p.title} cover`}
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className={styles.body}>
        <div className={styles.top}>
          <Link to={`/p/${p.slug}`} className={`${styles.title} focusRing`}>
            {p.title}
          </Link>
          <div className={styles.subtitle}>{p.subtitle}</div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.price}>{formatKes(p.priceKes)}</div>
          <div className={styles.actions}>
            <button
              className={`${styles.buyNow} focusRing`}
              type="button"
              disabled={!paystackPaymentUrl}
              onClick={() => {
                if (!paystackPaymentUrl) return
                openTrackedPaymentLink(paystackPaymentUrl, {
                  productId: p.id,
                  productTitle: p.title,
                  source: 'product_card',
                })
              }}
            >
              Buy now
            </button>

            <button
              className={`${styles.checkout} focusRing`}
              type="button"
              onClick={() => {
                add(p, 1)
                navigate('/checkout')
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

