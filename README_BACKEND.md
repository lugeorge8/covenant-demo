# Covenant Demo — Real Backend Next Steps

## 1) Create Postgres (Vercel)
- Vercel Dashboard → Project → Storage → Add → Postgres (Neon)
- Ensure the project has env vars:
  - `POSTGRES_URL`
  - `POSTGRES_URL_NON_POOLING` (recommended)

## 2) Apply schema + seed
Run the SQL in `db/001_init.sql` in the Vercel Postgres SQL console.

This creates:
- `clg_cases`
- `clg_case_notes`
- `clg_access_requests`

And inserts a small seed set of demo cases.

## 3) Admin auth
Admin is protected by a cookie set at `/admin/login`.
- Default password: `demo`
- Override with env var: `CLG_ADMIN_PASSWORD`

## 4) Verify
- Visit `/admin/login` and sign in
- Visit `/admin` (should show DB-backed rows)
- Add a note on a case; refresh and confirm it persists
- Submit `/request-access` and confirm a row appears in `clg_access_requests`

## 5) What to build next
- Real user accounts (admin/staff) in DB
- Case status update + audit trail
- File storage for documents + attachment metadata
- Inbound email intake (Postmark/Mailgun) + cover sheet parsing
