# Oak & Code — Web & App Development Agency

Production-ready marketing website for **Oak & Code**, a premium web & app development agency based in Vadodara, Gujarat.

**Tagline:** Rooted in Strategy. Built for Growth.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Backend:** Next.js API Routes (serverless)
- **Database:** PostgreSQL via Prisma ORM (Neon.tech)
- **Email:** Nodemailer (Gmail SMTP)
- **Auth:** JWT (admin dashboard)
- **Hosting:** Vercel (free tier)

## Quick Start (Local)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd oak-and-code
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your values (see below)

# 3. Set up database
npx prisma db push
npm run db:seed

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Neon direct connection string (for migrations) |
| `JWT_SECRET` | Random 32+ character secret for admin JWT |
| `NEXTAUTH_SECRET` | Additional secret (optional) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Gmail App Password (see below) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (optional) |
| `NEXT_PUBLIC_SITE_URL` | `https://oakandcode.in` |
| `CLOUDINARY_*` | Cloudinary credentials (optional, for admin uploads) |

## Neon.tech Database Setup

1. Go to [neon.tech](https://neon.tech) and create a free account (no credit card)
2. Click **Create Project** → name it `oak-and-code`
3. Copy the **Connection string** (pooled) → paste as `DATABASE_URL`
4. Copy the **Direct connection string** → paste as `DIRECT_URL`
5. Run:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail"
4. Copy the 16-character password → paste as `SMTP_PASS`
5. Set `SMTP_USER` to your Gmail address

## Admin Login

After seeding the database:

- **URL:** `/admin`
- **Email:** `admin@oakandcode.in`
- **Password:** `OakCode@2025!`

**Change this password immediately after first login in production.**

## Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/oak-and-code)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js
5. Run database setup:
   ```bash
   npx prisma db push
   npm run db:seed
   ```
   (Run locally pointing to production DATABASE_URL, or use Vercel CLI)

## Adding Portfolio Projects

**Via Admin Dashboard:**
1. Login at `/admin`
2. Go to Projects
3. Use Prisma Studio for full CRUD: `npm run db:studio`

**Via Seed/API:**
Edit `prisma/seed.ts` or POST to `/api/admin/projects` with JWT auth.

Required fields: `name`, `slug`, `category`, `description`, `challenge`, `solution`, `results`, `techStack`, `imageUrl`

## Changing Pricing

Edit pricing in:
- `components/sections/Pricing.tsx` (frontend display)
- `prisma/seed.ts` (database records)
- Or use Prisma Studio on the `PricingPlan` table

Update countdown timer via `SiteSettings.countdownEndDate` in Prisma Studio or admin stats API.

## Project Structure

```
app/                  # Next.js App Router pages & API routes
components/
  layout/             # Navbar, Footer
  sections/           # Hero, Services, Portfolio, etc.
  ui/                 # Reusable UI components
lib/                  # Utilities (prisma, auth, mailer, validators)
prisma/               # Schema & seed
public/               # Static assets
styles/               # Animation CSS
```

## Troubleshooting

### `PrismaClientInitializationError`
- Check `DATABASE_URL` is correct and Neon project is active
- Ensure `?sslmode=require` is in the connection string

### Emails not sending
- Verify Gmail App Password (not regular password)
- Check `SMTP_USER` and `SMTP_PASS` in `.env`
- Emails gracefully skip when SMTP is not configured (logs to console)

### Build fails on Vercel
- Ensure `DATABASE_URL` and `JWT_SECRET` are set in Vercel env vars
- `postinstall` runs `prisma generate` automatically

### Admin login fails
- Re-run seed: `npm run db:seed`
- Check credentials: `admin@oakandcode.in` / `OakCode@2025!`

### Images not loading
- External images from `picsum.photos` are allowed in `next.config.js`
- For production, upload to Cloudinary and update URLs

## License

Proprietary — Oak & Code © 2025
