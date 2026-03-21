import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

export function MotionPage(props: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {props.children}
    </motion.main>
  )
}

