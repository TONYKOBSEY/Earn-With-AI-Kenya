import type { ReactNode } from 'react'
import styles from './Field.module.css'

export function Field(props: { label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{props.label}</span>
      {props.children}
    </label>
  )
}

