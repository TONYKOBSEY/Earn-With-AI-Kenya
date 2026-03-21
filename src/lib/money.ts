export function formatKes(amount: number): string {
  try {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `KES ${Math.round(amount).toLocaleString()}`
  }
}

