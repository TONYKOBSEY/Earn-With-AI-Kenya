const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

function randInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive)
}

export function createOrderId(): string {
  // human-friendly, receipt-like ID
  const t = Date.now().toString(36).toUpperCase()
  const r = Array.from({ length: 6 }, () => alphabet[randInt(alphabet.length)]).join('')
  return `EWA-${t}-${r}`
}

export function createMpesaReceipt(): string {
  const r = Array.from({ length: 10 }, () => alphabet[randInt(alphabet.length)]).join('')
  return `SIM${r}`
}

export function createProductId(): string {
  const r = Array.from({ length: 8 }, () => alphabet[randInt(alphabet.length)]).join('')
  return `p_${Date.now().toString(36)}_${r}`.toLowerCase()
}

