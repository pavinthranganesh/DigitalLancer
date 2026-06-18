### What I added

- Front-end pages:
  - /books — catalog listing
  - /books/[slug] — product detail
  - /cart — client-side cart persisted to localStorage
  - /checkout — simple checkout form that creates a Stripe Checkout session via /api/checkout
- Added API endpoints:
  - GET /api/books
  - GET /api/books/[slug]
  - POST /api/ipay88 — example adapter stub that returns a redirect URL
- Vercel config (vercel.json) and a one-click Deploy button in README.deploy.md
- iPay88 adapter skeleton in src/lib/gateways/ipay88.ts

If you want, I can now:
1. Wire the frontend checkout to iPay88 (server-side) and present both payment options to buyers.
2. Improve UI/UX and add address fields to the checkout flow.
3. Implement admin pages for creating/updating books from the site.

Tell me which of these you'd like next and I will continue.
