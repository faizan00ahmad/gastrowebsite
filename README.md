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

## Content still to confirm

Edit `lib/site.ts`:

- `email` and `hours.time` (hidden on the site while empty)
- Instagram, YouTube and LinkedIn links in `social`

Edit `lib/content.ts`:

- `stats` values (the statistics section stays hidden until verified figures are added)
- `experience` for each specialist
- `galleryImages` once clinic photos are saved in `public/images/gallery/`

Stock photo credits are listed in `public/images/CREDITS.md`.
