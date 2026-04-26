# GitHub Pages Deployment

This repo ships with `.github/workflows/static.yml` that builds a standalone
SPA bundle and publishes it to GitHub Pages on every push to `main`.

## One-time setup

1. **Repo settings → Pages** → Source: **GitHub Actions**.
2. **Repo settings → Secrets and variables → Actions → Variables** → add:
   - `VITE_BASE_PATH` = `/` for a user/org root page (`<user>.github.io`)
   - `VITE_BASE_PATH` = `/<repo-name>/` for a project page
     (e.g. `/global-tech-nexus/`)

## How it works

This project's primary build target (`npm run build`) produces a TanStack
Start SSR bundle that needs a Worker runtime — GitHub Pages can't run that.

For Pages we use a separate **standalone SPA build**:

- `npm run build:spa` uses `vite.spa.config.ts` to bundle `spa.html` +
  `src/spa-entry.tsx`, which calls `createRoot(...)` against `<div id="root">`
  instead of hydrating a server-rendered tree.
- `node scripts/build-gh-pages-shell.mjs` then renames `spa.html` →
  `index.html`, copies it to `404.html` (SPA fallback for deep links), and
  drops a `.nojekyll` marker.
- The workflow uploads `dist/spa/` and deploys it to Pages.

## Local preview of the static site

```bash
npm run build:spa
node scripts/build-gh-pages-shell.mjs
npx serve dist/spa     # or any static server
```

## Notes

- The site is fully client-side rendered on Pages — server functions, edge
  routes, and SSR-only metadata won't run. Use this deploy target only for
  the public-facing static experience.
- Reduced-motion users get a static, non-animated fallback automatically
  (handled in `src/styles.css` and `src/hooks/use-reduced-motion.ts`).
