# CMS — Editing collections

The Gifting Collection is fully editable through the admin at **`/admin`**.
This document explains the (post-Supabase) architecture and what to expect
after clicking Save.

## How it works

- **Content lives in Supabase** — one row per collection in the
  `public.collections` table (schema in [`supabase/001_init.sql`](supabase/001_init.sql)).
  The row has `slug TEXT PRIMARY KEY`, `data JSONB` (the full collection
  object), and `updated_at TIMESTAMPTZ`.
- Public pages (home, `/collections`, `/collections/<slug>`) fetch their
  content in **route loaders** — server-side, on every request. This means
  saved changes go live **instantly** — no Vercel redeploy needed.
- The admin (`/admin/*`) authenticates via **Supabase Auth**. The editor
  submits changes through a server function that verifies the caller's
  session token and upserts the row via the service-role client.

## Env vars

Set these in **`.env.local`** for local dev and in **Vercel → Project
Settings → Environment Variables** for production.

| Variable                    | Where     | Purpose                                                  |
| --------------------------- | --------- | -------------------------------------------------------- |
| `VITE_SUPABASE_URL`         | client+srv| Your Supabase project URL (public).                      |
| `VITE_SUPABASE_ANON_KEY`    | client+srv| Public anon key — used for browser auth + public reads.  |
| `SUPABASE_SERVICE_ROLE_KEY` | server    | Secret — server bypasses RLS with this. Rotate if leaked.|
| `VITE_WEB3FORMS_ACCESS_KEY` | client    | Contact-form delivery key.                               |

Values live in **Supabase Dashboard → Project Settings → API**.

## First-time Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**, paste the contents of [`supabase/001_init.sql`](supabase/001_init.sql),
   click **Run**. This creates the `collections` table, RLS policies, and
   seeds any existing rows.
3. Open **Authentication → Users → Add user** and create your admin
   account (email + password). This is your `/admin/login` credential.
4. Copy the three keys from **Settings → API** into `.env.local` and Vercel.

## Adding another admin

**Authentication → Users → Add user** in the Supabase dashboard. Any user
with a valid Supabase session can edit collections. There's no separate
"admin" role — currently every authenticated user is an admin. If you
need per-user permissions later, tighten the RLS policy on the
`collections` table and add a role check in `admin-supabase.ts`.

## Using the admin

1. Go to `/admin/login`, enter your Supabase email + password.
2. The dashboard lists all rows in the `collections` table with an
   **Edit** button on each, plus a **New collection** button.
3. Click Save. The green banner confirms the upsert; the change is live
   on the public site on the next page load.

Images: paste a URL — either an existing path under `/public/` (e.g.
`/livin-bottle-box.jpg`) or a full external URL. To add a new photo,
drop it into `public/` in a Git commit yourself, then reference
`/your-photo.jpg` from the CMS.

## Sanity checks after saving

- Public detail page reflects your changes on refresh: `/collections/<slug>`
- Supabase **Table Editor → collections** shows the updated `data` and
  a fresh `updated_at`.

## If a save fails

- **"Not authorised — session token invalid or expired"** → your
  Supabase session ran out. Sign in again at `/admin/login`.
- **"SUPABASE_SERVICE_ROLE_KEY is not configured on the server"** →
  add it to `.env.local` (dev) or Vercel (prod) and restart/redeploy.
- **"Save failed: …"** → the raw Postgres error; usually an RLS or
  schema issue. Check the SQL editor and the row's shape.

## Rolling back a bad edit

Every save updates the `data` JSONB in place — there's no automatic
history. If you need version history later, we can add a
`collection_revisions` table with a trigger that inserts the old row
on every UPDATE. For now, either re-enter the previous content manually
or restore from a Supabase daily backup.
