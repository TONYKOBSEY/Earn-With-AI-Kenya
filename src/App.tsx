import { Suspense, lazy, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell'
import { RouteTracker } from './components/RouteTracker'
import { Home } from './pages/Home'

const Cart = lazy(() => import('./pages/Cart').then((module) => ({ default: module.Cart })))
const Checkout = lazy(() =>
  import('./pages/Checkout').then((module) => ({ default: module.Checkout })),
)
const OrderResult = lazy(() =>
  import('./pages/OrderResult').then((module) => ({ default: module.OrderResult })),
)
const Product = lazy(() =>
  import('./pages/Product').then((module) => ({ default: module.Product })),
)
const Shop = lazy(() => import('./pages/Shop').then((module) => ({ default: module.Shop })))
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((module) => ({ default: module.AdminLayout })),
)
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })),
)
const AdminOrders = lazy(() =>
  import('./pages/admin/AdminOrders').then((module) => ({ default: module.AdminOrders })),
)
const AdminProducts = lazy(() =>
  import('./pages/admin/AdminProducts').then((module) => ({ default: module.AdminProducts })),
)
const AdminSettings = lazy(() =>
  import('./pages/admin/AdminSettings').then((module) => ({ default: module.AdminSettings })),
)

function PageFallback() {
  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 44 }}>
      <div className="muted" style={{ padding: '6px 2px' }}>
        Loading...
      </div>
    </div>
  )
}

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="shop" element={withSuspense(<Shop />)} />
          <Route path="p/:slug" element={withSuspense(<Product />)} />
          <Route path="cart" element={withSuspense(<Cart />)} />
          <Route path="checkout" element={withSuspense(<Checkout />)} />
          <Route path="order/:orderId" element={withSuspense(<OrderResult />)} />

          <Route path="admin" element={withSuspense(<AdminLayout />)}>
            <Route index element={withSuspense(<AdminDashboard />)} />
            <Route path="products" element={withSuspense(<AdminProducts />)} />
            <Route path="orders" element={withSuspense(<AdminOrders />)} />
            <Route path="settings" element={withSuspense(<AdminSettings />)} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
