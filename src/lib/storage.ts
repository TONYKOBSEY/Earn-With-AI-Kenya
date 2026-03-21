type Json = null | boolean | number | string | Json[] | { [key: string]: Json }

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson<T extends Json>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('ewaik-storage'))
}

export function removeKey(key: string): void {
  localStorage.removeItem(key)
  window.dispatchEvent(new Event('ewaik-storage'))
}

export function safeNowIso(): string {
  return new Date().toISOString()
}

