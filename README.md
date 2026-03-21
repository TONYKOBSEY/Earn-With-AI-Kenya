# Earn With AI Kenya

Conversion-focused ebook storefront for practical AI income guides built for Kenya.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion

## Features

- Optimized landing page for the featured ebook
- Shop, product, cart, checkout, and receipt flows
- Product-level Paystack payment links
- Browser-based admin area for managing product content locally
- Netlify-ready SPA routing via `netlify.toml`

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Notes

- Secure checkout opens on Paystack when a product has a payment link configured.
- Current admin changes are browser-local and are not a replacement for a real backend or CMS.
