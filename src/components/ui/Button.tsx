import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type As = 'button' | 'link'

type CommonProps = {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: Extract<As, 'button'>
  }

export function Button({
  variant = 'primary',
  children,
  className = '',
  as = 'button',
  ...rest
}: ButtonProps) {
  const cls = `${styles.base} ${styles[variant]} ${className}`.trim()

  if (as === 'button') {
    return (
      <button {...rest} type={rest.type ?? 'button'} className={`${cls} focusRing`}>
        {children}
      </button>
    )
  }

  return (
    <button {...rest} type={rest.type ?? 'button'} className={`${cls} focusRing`}>
      {children}
    </button>
  )
}

