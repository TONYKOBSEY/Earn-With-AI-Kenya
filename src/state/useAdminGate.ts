import { useEffect, useMemo, useState } from 'react'
import { readJson, safeNowIso, writeJson } from '../lib/storage'

type AdminState = {
  pin: string
  unlockedUntil?: string
}

const STORAGE_KEY = 'ewaik_admin_v1'
const DEFAULT_PIN = '2540'

function readAdmin(): AdminState {
  return readJson<AdminState>(STORAGE_KEY, { pin: DEFAULT_PIN })
}

function writeAdmin(next: AdminState) {
  writeJson(STORAGE_KEY, next)
}

export function useAdminGate() {
  const [admin, setAdmin] = useState<AdminState>(() => readAdmin())

  useEffect(() => {
    writeAdmin(admin)
  }, [admin])

  const unlocked = useMemo(() => {
    if (!admin.unlockedUntil) return false
    return admin.unlockedUntil > safeNowIso()
  }, [admin.unlockedUntil])

  function unlock(enteredPin: string): boolean {
    const ok = enteredPin.trim() === admin.pin
    if (!ok) return false
    const until = new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString()
    setAdmin((a) => ({ ...a, unlockedUntil: until }))
    return true
  }

  function lock() {
    setAdmin((a) => ({ ...a, unlockedUntil: undefined }))
  }

  function setPin(newPin: string) {
    const pin = newPin.trim()
    if (pin.length < 4) return
    setAdmin((a) => ({ ...a, pin }))
  }

  return { unlocked, unlock, lock, setPin, storageKey: STORAGE_KEY, defaultPin: DEFAULT_PIN }
}

