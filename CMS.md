# CMS — Editing collections

The Gifting Collection is fully editable through the admin at **`/admin`**.
This document explains how it works, what env vars you need, and what you
should expect after clicking Save.

## How it works

- **Content lives as JSON** at `content/collections/<slug>.json`.
  Each file holds every editable field for one collection: hero, story,
  What's Included, Make It Personal, Fragrance Details, Livin' Experience,
  FAQ, Ready to Make Someone Smile.
- The site reads these files at build time via a Vite `import.meta.glob`
  in `src/data/collections.ts`. There is no runtime database.
- The admin (`src/routes/admin.*`) is a password-protected React UI that
  edits the fields locally, then calls a **server function** that commits
  the JSON back to GitHub via the Contents API.
- Vercel sees the new commit on the `main` branch and redeploys
  automatically. Your changes go live in **~1–2 minutes**.

## Env vars

Set these in **`.env.local`** for local dev and in **Vercel → Project
Settings → Environment Variables** for production. The names must match
exactly.

| Variable          | Purpose                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `ADMIN_PASSWORD`  | The password you type at `/admin/login`. Pick something long.                                       |
| `AUTH_SECRET`     | ≥16-char random string used to sign session tokens. Rotate to sign everyone out.                    |
| `GITHUB_TOKEN`    | Fine-grained PAT with **Contents: Read and write** on `Vinayx2005/livin`.                           |
| `GITHUB_REPO`     | `Vinayx2005/livin` — the repo the CMS commits to.                                                   |
| `GITHUB_BRANCH`   | Optional; defaults to `main`. Change only if you want CMS commits on a different branch.            |

### Generating a GitHub token

1. Go to https://github.com/settings/personal-access-tokens/new
2. **Fine-grained tokens** → **Generate new token**
3. **Resource owner**: `Vinayx2005`
4. **Repository access**: **Only select repositories** → pick `livin`
5. **Permissions** → **Repository permissions** → set **Contents** to
   **Read and write**. Everything else stays at "No access".
6. Generate. Copy the token starting with `github_pat_…` — this is your
   `GITHUB_TOKEN`.

Token best practice: give it a 90-day expiry, add a reminder to rotate.

## Using the admin

1. Go to `/admin/login`, enter your `ADMIN_PASSWORD`.
2. The dashboard lists all existing collections and offers a
   **New collection** button that prompts for a slug.
3. Click **Edit** on any collection to open the full editor. Every
   section is grouped and every field is present.
4. Click **Save changes** (or **Create collection**) at the bottom.
   The green banner confirms the commit went through; wait ~1–2 min
   for Vercel to redeploy, then hard-refresh the public site.

Images: paste a URL — either an existing path under `/public/` (e.g.
`/livin-bottle-box.jpg`) or a full external URL. To add a new photo,
drop it into `public/` in a Git commit yourself, then reference
`/your-photo.jpg` from the CMS.

## Sanity checks after deploying

After the first redeploy from an edit:

- Public detail page reflects your changes: `/collections/<slug>`
- `content/collections/<slug>.json` on `main` in GitHub matches what the
  admin shows.
- The admin's dashboard lists the new collection if you just created one.

## If a save fails

Common causes:

- **"AUTH_SECRET env var missing or too short"** → set/rotate the var,
  then restart the dev server (Vercel picks it up on next deploy).
- **"GitHub write failed (401)"** → the `GITHUB_TOKEN` is missing,
  expired, or lacks Contents write on the repo.
- **"GitHub write failed (409)"** → a race between two people editing
  the same file. Reload the admin and try again.
- **"Not authorised — admin token missing or invalid"** → your login
  session expired (12h TTL) or `AUTH_SECRET` was rotated. Log in again.

## Rolling back

Every save is a normal Git commit on `main`. To undo a bad edit:

```bash
git revert <commit-sha>
git push
```

Vercel redeploys and the previous content is back.
