# Gastro Plus Medical Complex Multan — website

Static website built with Next.js 15 (`output: "export"`). No backend: bookings open WhatsApp with the details filled in.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3030 (the dev server is pinned to port 3030 so it does not clash with other projects on 3000).

## Build

```bash
npm run build
```

The static site is written to `out/`.

## Deploy on Vercel

1. Import this repository in Vercel. The Next.js framework preset is detected automatically; no extra settings are needed.
2. Optional: add the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://www.gastroplusmultan.com`) once a custom domain is connected. Without it, the Vercel production URL is used for canonical links and the sitemap.
3. Search indexing is **off by default** (robots.txt disallows all and pages carry `noindex`), so previews are never indexed. When management approves the final site, set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the production environment and redeploy.

Old URLs (`/patient-guides/`, renamed department slugs, `/specialists/dr-hunain/`) are redirected in `vercel.json`.

## Content still to confirm

The site follows the *GPMC Final Website Roadmap*. Everything below is held in one place so it is changed once.

`lib/site.ts` (contact data, the single source of truth):

- `email` (hidden while empty) and `regulatory` (PHC registration; hidden while empty)
- `phones`: confirm labels and set `whatsapp: true` on the second number only after testing it
- `opdHours` (currently Monday – Friday, 3:00 PM – 9:00 PM, as supplied by management)
- `social` and `googleBusinessUrl`: add official Google Business Profile, Instagram, LinkedIn, YouTube, TikTok and X URLs only

`lib/content.ts`:

- `vision`, `mission`, `values`: proposed drafts from the roadmap, pending management approval
- Specialists: `schedule` (GPMC clinic days), Dr. Muhammad Hunain's `photo`, and verification of all titles and affiliations
- Departments: confirm in-house vs partner services (laboratory tests, ultrasound scope, pharmacy hours, dental treatments)
- Procedures and articles: set `reviewedBy` once a clinician has reviewed each page
- `vacancies` (empty = "no open positions"), `galleryImages` (approved photos of real GPMC spaces)

Stock photo credits are listed in `public/images/CREDITS.md`. Stock photos are placeholders and should be replaced with authentic GPMC photography.
