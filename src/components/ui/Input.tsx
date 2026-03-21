import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './Input.module.css'

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${styles.input} focusRing ${props.className ?? ''}`} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${styles.textarea} focusRing ${props.className ?? ''}`} />
}

