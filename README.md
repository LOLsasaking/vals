# VALS — Premium US Auto Imports · Tenerife

High-end automotive portfolio & US import-service site.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber + drei

Theme: **clean white + blue** — white / light-gray surfaces, navy text, royal-blue accents, navy footer.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  app/
    layout.tsx              # fonts, metadata, <body> theme
    page.tsx                # renders <SiteShell/>
    globals.css             # palette helpers, marquee mask, reduced-motion
    api/import-request/route.ts   # survey + contact submissions (Resend-ready)
  components/
    SiteShell.tsx           # client wrapper; owns modal state, lazy-loads 3D modal
    Nav.tsx                 # sticky nav, transparent→white on scroll
    Hero.tsx                # bg video + logo fade/scale + scroll chevron
    Inventory.tsx           # 2-car grid; still → 360° video on hover
    VehicleModal.tsx        # full-screen 3D explorer (R3F + OrbitControls) + specs
    VehicleScene.tsx        # loads .glb, falls back to a stylized procedural SUV
    ImportHub.tsx           # logistics disclosure + 3-step survey
    Reviews.tsx             # 3 alternating infinite marquee tracks
    Footer.tsx              # about + contact info/form (navy band)
  data/vehicles.ts          # single source of truth for inventory + specs
```

## Swapping in your real media

All placeholder media lives under `public/assets/`. Replace the files (keep the
names) — no code changes needed.

| What | Path | Notes |
|------|------|-------|
| Hero video | `public/assets/hero.mp4` | premium drift-into-frame studio clip, loops |
| Hero poster | `public/assets/hero-poster.svg` | shown before video loads — swap for `.jpg` and update `HERO_POSTER` in `Hero.tsx` |
| 4Runner still | `public/assets/vehicles/4runner.svg` | masked transparent-bg studio shot (swap for `.png` + update path in `data/vehicles.ts`) |
| 4Runner 360° | `public/assets/vehicles/4runner-360.mp4` | spin loop shown on card hover |
| Bronco still | `public/assets/vehicles/bronco-sport.svg` | as above |
| Bronco 360° | `public/assets/vehicles/bronco-sport-360.mp4` | spin loop on hover |
| 4Runner 3D | `public/assets/models/4runner.glb` | loaded in modal; until present, a stylized SUV is shown |
| Bronco 3D | `public/assets/models/bronco-sport.glb` | as above |

Edit inventory data (prices, specs, mileage, paths) in `src/data/vehicles.ts`.

## Email delivery (survey + contact)

The API route works without configuration — it logs the lead and returns success.
To actually deliver emails via [Resend](https://resend.com):

1. Copy `.env.example` → `.env.local`
2. Set `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, and a verified `LEAD_FROM_EMAIL`
3. Restart the dev server

## Accessibility / performance

- Honors `prefers-reduced-motion`
- Hero & 360° videos are `muted` + `playsInline`; hover videos use `preload="none"`
- The 3D modal is dynamically imported (`ssr: false`) so three.js stays out of the initial bundle and unmounts cleanly on close
