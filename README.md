# DigitalLancer

Starter e-commerce scaffold for selling physical books (Malaysia, MYR) with Stripe Checkout and a local-gateway adapter stub (iPay88). Guest checkout and generic shipping supported.

Quick start

1. Clone the repo and install dependencies:

   npm install

2. Copy `.env.example` to `.env` and fill in values (DATABASE_URL, Stripe keys, ADMIN_PASSWORD, SITE_URL)

3. Generate Prisma client and run migrations:

   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed

4. Run the dev server:

   npm run dev

Key folders
- prisma/ - Prisma schema and seed
- src/app - Next.js App Router pages and API routes
- src/lib - helpers (Prisma client)

Payment gateways
- Primary: Stripe Checkout (supports MYR and international cards)
- Fallback: iPay88 adapter stub is provided in `src/lib/gateways/ipay88.ts` for future integration

Environment variables
See `.env.example`.

Next steps I will take after you test locally or provide deploy access:
- Configure a Vercel deployment (if you want) and set environment variables there
- Add courier integrations (PosLaju/EasyParcel) and tax rules

