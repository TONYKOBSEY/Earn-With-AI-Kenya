import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import styles from './TestimonialCarousel.module.css'

export type Testimonial = {
  id: string
  name: string
  role: string
  location: string
  avatarSrc: string
  quote: string
  tool: {
    name: string
    url: string
  }
}

export function TestimonialCarousel(props: {
  items: Testimonial[]
  autoAdvanceMs?: number
}) {
  const items = props.items
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)

  const safeIndex = useMemo(() => {
    if (items.length === 0) return 0
    return ((index % items.length) + items.length) % items.length
  }, [index, items.length])

  const current = items[safeIndex]

  useEffect(() => {
    if (items.length <= 1) return
    const ms = props.autoAdvanceMs ?? 6500
    const t = window.setInterval(() => {
      setDir(1)
      setIndex((i) => i + 1)
    }, ms)
    return () => window.clearInterval(t)
  }, [items.length, props.autoAdvanceMs])

  function prev() {
    setDir(-1)
    setIndex((i) => i - 1)
  }
  function next() {
    setDir(1)
    setIndex((i) => i + 1)
  }

  if (!current) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div className={styles.headerCopy}>
          <div className={styles.kicker}>Testimonials</div>
          <h2 className="h2">Real wins from Kenyan creators</h2>
          <p className={styles.subhead}>
            Short, practical workflows people can execute fast - plus the AI tools they used.
          </p>
        </div>

        <div className={styles.controls} aria-label="Carousel controls">
          <button className={`${styles.navBtn} focusRing`} type="button" onClick={prev}>
            Prev
          </button>
          <button className={`${styles.navBtn} focusRing`} type="button" onClick={next}>
            Next
          </button>
        </div>
      </div>

      <div className={styles.card} role="region" aria-label="Testimonial carousel">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={current.id}
            className={styles.slide}
            custom={dir}
            initial={{ opacity: 0, x: dir * 26, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: dir * -26, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className={styles.left}>
              <img className={styles.avatar} src={current.avatarSrc} alt={`${current.name} avatar`} />
              <div className={styles.person}>
                <div className={styles.name}>{current.name}</div>
                <div className={styles.meta}>
                  {current.role} | {current.location}
                </div>
              </div>
            </div>

            <blockquote className={styles.quote}>
              <span className={styles.quoteMark} aria-hidden="true">
                "
              </span>
              {current.quote}
            </blockquote>

            <div className={styles.toolRow}>
              <span className={styles.toolLabel}>AI tool used</span>
              <a
                className={`${styles.toolLink} focusRing`}
                href={current.tool.url}
                target="_blank"
                rel="noreferrer"
              >
                {current.tool.name}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dots} aria-label="Carousel pagination">
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ''} focusRing`}
            onClick={() => {
              setDir(i > safeIndex ? 1 : -1)
              setIndex(i)
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
