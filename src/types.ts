export type ProductStatus = 'active' | 'draft' | 'archived'

export type Product = {
  id: string
  slug: string
  title: string
  subtitle: string
  priceKes: number
  paystackPaymentUrl?: string
  coverImage: string
  previewImage?: string
  previewExcerptTitle?: string
  previewExcerpt?: string
  previewHighlights?: string[]
  description: string
  bullets: string[]
  whatYoullLearn: string[]
  tags: string[]
  ratingAvg: number
  ratingCount: number
  status: ProductStatus
  updatedAt: string
}

export type Review = {
  id: string
  productId: string
  name: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  createdAt: string
}

export type CartItem = {
  productId: string
  qty: number
  unitPriceKesSnapshot: number
}

export type BuyerInfo = {
  name: string
  phone: string
  email?: string
  notes?: string
}

export type OrderLine = {
  productId: string
  titleSnapshot: string
  qty: number
  unitPriceKesSnapshot: number
}

export type OrderStatus = 'paid' | 'failed' | 'cancelled'

export type Order = {
  id: string
  createdAt: string
  status: OrderStatus
  buyer: BuyerInfo
  lines: OrderLine[]
  subtotalKes: number
  paymentMethod: 'mpesa_stk_sim'
  mpesa: {
    phone: string
    receipt?: string
  }
}

