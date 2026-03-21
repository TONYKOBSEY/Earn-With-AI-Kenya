import { MotionPage } from '../../components/MotionPage'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts'
import { formatKes } from '../../lib/money'
import { useOrders } from '../../state/useOrders'
import { useProducts } from '../../state/useProducts'
import { useMemo } from 'react'

export function AdminDashboard() {
  const { orders } = useOrders()
  const { products } = useProducts()

  const paid = useMemo(() => orders.filter((o) => o.status === 'paid'), [orders])

  const revenueKes = useMemo(() => paid.reduce((sum, o) => sum + o.subtotalKes, 0), [paid])

  const series = useMemo(() => computeRevenueSeries(paid, 14), [paid])
  const top = useMemo(() => computeTopProducts(paid, products), [paid, products])

  return (
    <MotionPage>
      <div style={{ display: 'grid', gap: 14 }}>
        <section
          className="glass"
          style={{
            padding: 18,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          <Kpi title="Revenue (paid)" value={formatKes(revenueKes)} />
          <Kpi title="Paid orders" value={`${paid.length}`} />
          <Kpi title="All orders" value={`${orders.length}`} />
          <Kpi title="Top product" value={top[0]?.name ?? 'N/A'} />
        </section>

        <section className="glass" style={{ padding: 18 }}>
          <h2 className="h2">Revenue (last 14 days)</h2>
          <div style={{ height: 260, marginTop: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid stroke="rgba(214, 168, 74, 0.12)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(246, 245, 242, 0.55)" />
                <YAxis stroke="rgba(246, 245, 242, 0.55)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(7, 19, 15, 0.92)',
                    border: '1px solid rgba(214, 168, 74, 0.22)',
                    borderRadius: 14,
                  }}
                  labelStyle={{ color: 'rgba(246, 245, 242, 0.8)' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenueKes"
                  stroke="rgba(242, 200, 107, 0.92)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass" style={{ padding: 18 }}>
          <h2 className="h2">Top products</h2>
          <div style={{ height: 260, marginTop: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top.slice(0, 6)} layout="vertical">
                <CartesianGrid stroke="rgba(214, 168, 74, 0.12)" horizontal={false} />
                <XAxis type="number" stroke="rgba(246, 245, 242, 0.55)" />
                <YAxis type="category" dataKey="name" width={160} stroke="rgba(246, 245, 242, 0.55)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(7, 19, 15, 0.92)',
                    border: '1px solid rgba(214, 168, 74, 0.22)',
                    borderRadius: 14,
                  }}
                  labelStyle={{ color: 'rgba(246, 245, 242, 0.8)' }}
                />
                <Bar dataKey="revenueKes" fill="rgba(214, 168, 74, 0.55)" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </MotionPage>
  )
}

function Kpi(props: { title: string; value: string }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 18,
        border: '1px solid rgba(214, 168, 74, 0.12)',
        background: 'rgba(13, 26, 20, 0.35)',
      }}
    >
      <div className="muted" style={{ fontSize: 12 }}>
        {props.title}
      </div>
      <div style={{ color: 'var(--text0)', fontWeight: 900, fontSize: 18, marginTop: 6 }}>
        {props.value}
      </div>
    </div>
  )
}

function computeRevenueSeries(paidOrders: { createdAt: string; subtotalKes: number }[], days: number) {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - (days - 1))
  start.setHours(0, 0, 0, 0)

  const bucket = new Map<string, number>()
  for (const o of paidOrders) {
    const d = new Date(o.createdAt)
    d.setHours(0, 0, 0, 0)
    const key = d.toISOString().slice(0, 10)
    bucket.set(key, (bucket.get(key) ?? 0) + o.subtotalKes)
  }

  const out: { day: string; revenueKes: number }[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    out.push({ day: key.slice(5), revenueKes: bucket.get(key) ?? 0 })
  }
  return out
}

function computeTopProducts(paidOrders: { lines: { productId: string; qty: number; unitPriceKesSnapshot: number }[] }[], products: { id: string; title: string }[]) {
  const nameById = new Map(products.map((p) => [p.id, p.title]))
  const revenueById = new Map<string, number>()
  for (const o of paidOrders) {
    for (const l of o.lines) {
      revenueById.set(l.productId, (revenueById.get(l.productId) ?? 0) + l.qty * l.unitPriceKesSnapshot)
    }
  }
  return Array.from(revenueById.entries())
    .map(([id, revenueKes]) => ({ id, name: nameById.get(id) ?? id, revenueKes }))
    .sort((a, b) => b.revenueKes - a.revenueKes)
}

