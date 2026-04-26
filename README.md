# Global Tech Infrastructure Nexus

A cinematic, scroll-driven 3D experience that takes the viewer from low-Earth
orbit down to the silicon. Built with **React 19 + Vite 7 + TanStack Start**,
animated with **Framer Motion**, styled with **Tailwind CSS v4**.

> Live demo: deploy via the GitHub Actions workflow below.

---

## ✨ Features

- 5 sticky-parallax sections: Orbit → Network → City Grid → Underground Core → Silicon
- Scroll snapping (`scroll-snap-type: y proximity`)
- Real 3D depth using CSS `perspective` + `translateZ` layers
- Clickable hotspots (satellites, logic gates) with accessible modal telemetry
- Custom spring cursor, particle field, scanline + vignette overlays
- Fully accessible: skip-link, ARIA landmarks, `prefers-reduced-motion` honored
- Static SPA build target — deployable to GitHub Pages, Netlify, Vercel, S3, etc.

---

## 🚀 Quick start (local)

```bash
npm install
npm run dev          # TanStack Start dev server
```

Open http://localhost:3000

### Build a static SPA bundle (used for GitHub Pages)

```bash
npm run build:spa
node scripts/build-gh-pages-shell.mjs
npx serve dist/spa
```

---

## 📦 Deploying to GitHub Pages

The workflow at **`.github/workflows/static.yml`** builds the SPA and
publishes `dist/spa/` to GitHub Pages on every push to `main`.

### One-time setup (do this once on GitHub)

1. **Push this repo to GitHub** (any name).
2. Go to **Settings → Pages**
   - **Source:** `GitHub Actions`
3. Go to **Settings → Actions → General**
   - **Workflow permissions:** `Read and write permissions` ✅
4. Go to **Settings → Secrets and variables → Actions → Variables tab**
   - Click **New repository variable**
   - **Name:** `VITE_BASE_PATH`
   - **Value:**
     - `/` → if your repo is `<username>.github.io` (user/org root site)
     - `/<repo-name>/` → if it's a project page, e.g. `/global-tech-nexus/`
       (must include the leading **and** trailing slash)
5. Push to `main` (or run the workflow manually from the **Actions** tab).
6. Wait ~2 min. Your site is live at:
   - User site: `https://<username>.github.io/`
   - Project site: `https://<username>.github.io/<repo-name>/`

### Do you need to do anything else?

| Need | Action |
|---|---|
| Repo is `<username>.github.io` | Set `VITE_BASE_PATH = /` |
| Repo is anything else | Set `VITE_BASE_PATH = /<repo-name>/` |
| Pages tab shows "Source: Deploy from a branch" | Change to **GitHub Actions** |
| Workflow fails on permissions | Enable read/write in Actions → General |
| Site loads but assets 404 | `VITE_BASE_PATH` is wrong — fix it and re-run the workflow |
| Deep links 404 on refresh | Already handled — `404.html` is generated as SPA fallback |

That's it. No other settings required.

---

## 🧱 Project structure

```
src/
├── routes/                # TanStack Router file-based routes
│   ├── __root.tsx
│   └── index.tsx          # Main scroll experience
├── components/nexus/      # All section + UI components
│   ├── SpaceSection.tsx
│   ├── NetworkSection.tsx
│   ├── CitySection.tsx
│   ├── UndergroundSection.tsx
│   ├── CircuitSection.tsx
│   ├── HotspotDialog.tsx
│   ├── CustomCursor.tsx
│   ├── ParticleField.tsx
│   └── NavChrome.tsx
├── hooks/use-reduced-motion.ts
├── assets/                # AI-generated backgrounds (imported as ES modules)
├── spa-entry.tsx          # Client-side SPA bootstrap (used by Pages build)
└── styles.css             # Tailwind v4 + design tokens

scripts/build-gh-pages-shell.mjs   # Renames spa.html → index.html, adds 404 + .nojekyll
vite.spa.config.ts                 # Vite config for the static SPA build
spa.html                           # SPA HTML shell
.github/workflows/static.yml       # GitHub Pages CI/CD
```

---

## 🛠 Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server (TanStack Start) |
| `npm run build` | Build the full SSR bundle (Cloudflare/Workers target) |
| `npm run build:spa` | Build the static SPA bundle for GitHub Pages |
| `npm run preview` | Preview the build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## ♿ Accessibility

- "Skip to content" link for keyboard users
- Section landmarks (`<section aria-label>`)
- All hotspots are real `<button>` elements with `aria-label`
- `prefers-reduced-motion` disables snapping, parallax, and entrance animations

---

## 📝 License

MIT — do whatever you want.
