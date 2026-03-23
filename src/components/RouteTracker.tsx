import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { trackPageView } from '../lib/analytics'

export function RouteTracker() {
  const location = useLocation()

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`
    trackPageView(pagePath)
  }, [location.hash, location.pathname, location.search])

  return null
}
