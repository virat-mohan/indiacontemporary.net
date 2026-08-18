# Artist Onboarding — Setup Checklist

This backend needs two free accounts before it can go live. The code is
already built and deployed; it just needs credentials.

## 1. Supabase (database, accounts, file storage)

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine to start).
2. In the Supabase dashboard, go to **SQL Editor -> New query**, paste the
   entire contents of `supabase/schema.sql` from this repo, and run it.
   This creates all the tables, security rules, and storage buckets.
3. Go to **Settings -> API** and copy:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (click "reveal" — keep this one secret)

## 2. Resend (sending emails)

1. Create an account at [resend.com](https://resend.com) (free tier covers this easily).
2. Verify a sending domain (e.g. `indiacontemporary.net`) under **Domains**,
   or start with their default onboarding@resend.dev sender for testing.
3. Go to **API Keys** and create one.

## 3. Add the credentials to Vercel

In the Vercel project settings for this site, under **Environment
Variables**, add (see `.env.example` for the full list):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL` (same value as above)
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_NOTIFICATION_EMAILS`
- `SITE_URL` (e.g. `https://indiacontemporary.net`)

Redeploy after adding these — Vercel only picks up new env vars on the
next deploy.

## 4. Give people admin access

`supabase/schema.sql` already seeds the `admins` table with:
`viratmohan@gmail.com`, `vijit.hooda@gmail.com`,
`portfolio@indiacontemporary.net`, `udithooda@gmail.com`.

Each of those people just needs to **create an account at `/apply`** using
that exact email — once they do, `/admin` will recognise them. To add or
remove an admin later, edit the `admins` table directly in the Supabase
dashboard (Table Editor).

## What's built vs. what's next

**Built:** artist sign-up/login, the multi-step application (profile,
photo, unlimited artworks with images, review), the auto-generated
Artist-Curator Agreement PDF with a per-artwork annexure and typed
signature capture, the admin review dashboard (per-artist commission %,
approve/reject with automatic emails, publish toggles).

**Not yet wired:** the public Artists/Artworks/Home pages still read only
from the static `src/data/*.js` files. "Publish to site" in the admin
flips a database flag, but nothing on the live site reads it yet — that's
the next piece of work, so a newly approved artist doesn't appear
publicly until that's built.
