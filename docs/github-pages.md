# GitHub Pages Deployment

This repo ships with `.github/workflows/deploy.yml` that builds the site and
publishes the static client bundle to GitHub Pages on every push to `main`.

## One-time setup

1. **Repo settings → Pages** → Source: **GitHub Actions**.
2. **Repo settings → Secrets and variables → Actions → Variables** → add:
   - `VITE_BASE_PATH` = `/` for a user/org root page (`<user>.github.io`)
   - `VITE_BASE_PATH` = `/<repo-name>/` for a project page
     (e.g. `/global-tech-nexus/`)

## How it works

- `npm run build` produces `dist/client/` (assets only — no HTML, since the
  upstream framework relies on an SSR worker that GitHub Pages can't run).
- `scripts/build-gh-pages-shell.mjs` then synthesizes a static `index.html`
  + `404.html` (SPA fallback) wired to the built JS/CSS.
- The workflow uploads `dist/client/` and deploys it to Pages.

## Local preview of the static shell

```bash
npm run build
node scripts/build-gh-pages-shell.mjs
npx serve dist/client     # or any static server
```

## Notes

- The site is fully client-side rendered on Pages — server functions, edge
  routes, and SSR-only metadata won't run. Use this deploy target only for
  the public-facing static experience.
- Reduced-motion users get a static, non-animated fallback automatically
  (handled in `src/styles.css` and `src/hooks/use-reduced-motion.ts`).
