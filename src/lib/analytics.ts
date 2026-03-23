const GA_MEASUREMENT_ID = 'G-NEZR6LBRHX'
const PAYMENT_CLICK_EVENT_NAME = 'click_payment'
const PAYMENT_CLICK_TIMEOUT_MS = 300

type PaymentClickDetails = {
  productId?: string
  productTitle?: string
  source?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

let lastTrackedPath = ''

export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') {
    return
  }

  if (lastTrackedPath === path) {
    return
  }

  lastTrackedPath = path

  // Track with Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    })
  }

  // Track with Clarity
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'page', path)
  }
}

export function openTrackedPaymentLink(url: string, details: PaymentClickDetails = {}) {
  if (typeof window === 'undefined') {
    return
  }

  let hasNavigated = false

  const navigate = () => {
    if (hasNavigated) {
      return
    }

    hasNavigated = true
    window.location.assign(url)
  }

  if (typeof window.gtag !== 'function') {
    navigate()
    return
  }

  const timeoutId = window.setTimeout(navigate, PAYMENT_CLICK_TIMEOUT_MS)

  window.gtag('event', PAYMENT_CLICK_EVENT_NAME, {
    event_category: 'engagement',
    event_label: 'mpesa_payment',
    payment_provider: 'paystack',
    payment_source: details.source ?? 'unknown',
    payment_product_id: details.productId,
    payment_product_title: details.productTitle,
    transport_type: 'beacon',
    event_callback: () => {
      window.clearTimeout(timeoutId)
      navigate()
    },
  })
}
