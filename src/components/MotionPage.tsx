import { type ReactNode } from 'react'

export function MotionPage(props: { children: ReactNode }) {
  return <main>{props.children}</main>
}

