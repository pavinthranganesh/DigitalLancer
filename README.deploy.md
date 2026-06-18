# Vercel Deployment

One-click deploy to Vercel:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pavinthranganesh/DigitalLancer)

Environment variables to set on Vercel:
- DATABASE_URL (Postgres connection string)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- ADMIN_PASSWORD
- NEXT_PUBLIC_SITE_URL (https://your-domain.vercel.app)

Notes:
- Set the project framework to Next.js (Vercel auto-detects this by default).
- After deploying, configure the Stripe webhook to point to: https://<your-deployment>/api/webhook and copy the signing secret into STRIPE_WEBHOOK_SECRET.
