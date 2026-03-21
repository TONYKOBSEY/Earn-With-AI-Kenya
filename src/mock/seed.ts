import type { Product, Review } from '../types'

export const seedProducts: Product[] = [
  {
    id: 'p_kenya_ai_money',
    slug: 'earn-money-with-ai-kenya',
    title: 'How to Earn Money with AI in Kenya',
    subtitle: 'Practical playbooks for Kenyan youth to thrive with AI',
    priceKes: 499,
    paystackPaymentUrl: 'https://paystack.com/buy/how-to-earn-money-with-ai-in-kenya',
    coverImage: '/assets/cover-optimized.jpg',
    previewImage: '/assets/cover-optimized.jpg',
    previewExcerptTitle: 'Inside the PDF',
    previewExcerpt:
      '"Start with one offer a biashara owner can understand instantly: a simple, fixed-price package that solves a visible problem this week."',
    previewHighlights: [
      'Offer examples priced in KES',
      'A simple outreach message you can send today',
      'A 7-day execution plan for your first paying client',
    ],
    description:
      'A field-tested guide for turning modern AI tools into real KES - without hype. Learn offers, workflows, and how to sell services and digital products locally.',
    bullets: [
      'Pick a profitable offer in under 30 minutes',
      'Set up a simple delivery system using free tools',
      'Price in KES, sell in Kenya, and get paid through a secure checkout flow',
    ],
    whatYoullLearn: [
      'Prompting that produces sellable outputs',
      'Client outreach scripts tailored to Kenya',
      'How to package AI services as fixed-price products',
      'A 7-day execution plan',
    ],
    tags: ['M-Pesa', 'Side Hustles', 'Prompting', 'Kenya'],
    ratingAvg: 4.7,
    ratingCount: 128,
    status: 'active',
    updatedAt: new Date('2026-03-01T12:00:00.000Z').toISOString(),
  },
  {
    id: 'p_prompting_swift',
    slug: 'prompting-for-income',
    title: 'Prompting for Income',
    subtitle: 'Turn prompts into products, faster than you think',
    priceKes: 599,
    paystackPaymentUrl: '',
    coverImage: '/assets/cover-optimized.jpg',
    previewImage: '/assets/cover-optimized.jpg',
    previewExcerptTitle: 'Sample extract',
    previewExcerpt:
      '"A good prompt is not decoration. It is a production tool: brief clearly, define tone, set the format, then review with a quality checklist before delivery."',
    previewHighlights: [
      'Prompt formulas for proposals, captions, and client work',
      'Before-and-after examples that sharpen weak outputs',
      'A delivery checklist that makes the work feel premium',
    ],
    description:
      'A focused toolkit of prompt templates and workflows for producing assets people pay for: proposals, social posts, resumes, lesson plans, and more.',
    bullets: [
      '20+ plug-and-play prompt recipes',
      'How to build a repeatable client workflow',
      'Quality checks so outputs stay consistent',
    ],
    whatYoullLearn: [
      'How to brief AI like a pro',
      'How to avoid hallucination traps',
      'How to deliver work that feels premium',
    ],
    tags: ['Templates', 'Freelancing', 'Quality', 'East Africa'],
    ratingAvg: 4.5,
    ratingCount: 74,
    status: 'active',
    updatedAt: new Date('2026-02-10T12:00:00.000Z').toISOString(),
  },
  {
    id: 'p_micro_saas',
    slug: 'micro-saas-with-ai',
    title: 'Micro-SaaS with AI (No Backend Edition)',
    subtitle: 'Ship a sellable prototype in a weekend',
    priceKes: 999,
    paystackPaymentUrl: '',
    coverImage: '/assets/cover-optimized.jpg',
    previewImage: '/assets/cover-optimized.jpg',
    previewExcerptTitle: 'Preview page',
    previewExcerpt:
      '"Your first prototype does not need a backend. It needs believable screens, sharp messaging, and one clear use case that makes the demo feel real."',
    previewHighlights: [
      'A weekend build plan with mock data',
      'Landing-page copy patterns that create trust fast',
      'A demo flow that looks convincing before integrations exist',
    ],
    description:
      'Learn to ship a convincing MVP using mock data and great UX, then validate demand before you build the heavy backend.',
    bullets: [
      'Pick a niche and validate quickly',
      'Design an MVP that feels real',
      'Demo payment flows without integrations',
    ],
    whatYoullLearn: [
      'How to prototype fast with mock JSON',
      'How to write landing pages that convert',
      'How to build trust in a simple UI',
    ],
    tags: ['MVP', 'SaaS', 'UX', 'Validation'],
    ratingAvg: 4.6,
    ratingCount: 41,
    status: 'active',
    updatedAt: new Date('2026-01-15T12:00:00.000Z').toISOString(),
  },
]

export const seedReviews: Review[] = [
  {
    id: 'r_1',
    productId: 'p_kenya_ai_money',
    name: 'Amina',
    rating: 5,
    text: 'Very practical. The 7-day plan helped me start offering AI poster + caption packages for local businesses.',
    createdAt: new Date('2026-03-04T08:10:00.000Z').toISOString(),
  },
  {
    id: 'r_2',
    productId: 'p_kenya_ai_money',
    name: 'Brian',
    rating: 4,
    text: 'Clear examples and good Kenya-specific pricing advice. Would love more niche ideas, but solid.',
    createdAt: new Date('2026-03-06T12:44:00.000Z').toISOString(),
  },
  {
    id: 'r_3',
    productId: 'p_prompting_swift',
    name: 'Faith',
    rating: 5,
    text: 'The templates are plug-and-play. I used them to deliver proposals faster and my close rate improved.',
    createdAt: new Date('2026-02-14T09:30:00.000Z').toISOString(),
  },
]

