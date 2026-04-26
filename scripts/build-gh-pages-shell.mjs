#!/usr/bin/env node
/**
 * Generates a minimal SPA shell index.html for GitHub Pages from the Vite
 * client manifest. TanStack Start normally serves HTML from the SSR worker,
 * which is not available on GitHub Pages, so this script wires up the built
 * JS and CSS into a static shell that hydrates on the client.
 *
 * Usage:  node scripts/build-gh-pages-shell.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");
const BASE = process.env.VITE_BASE_PATH || "/";

if (!existsSync(ASSETS_DIR)) {
  console.error(`[gh-pages] No client build at ${ASSETS_DIR} — run 'npm run build' first.`);
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
const css = files.filter((f) => f.endsWith(".css")).map((f) => `${BASE}assets/${f}`);
// Pick the JS entry (main-*.js takes priority, otherwise index-*.js)
const jsCandidates = files.filter((f) => f.endsWith(".js"));
const entry =
  jsCandidates.find((f) => f.startsWith("main-")) ||
  jsCandidates.find((f) => f.startsWith("index-")) ||
  jsCandidates[0];

if (!entry) {
  console.error("[gh-pages] No JS entry found.");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Global Tech Infrastructure Nexus — Satellite to Silicon</title>
    <meta name="description" content="A cinematic, scroll-driven view of global infrastructure — from orbiting satellites and sub-sea cables to underground turbines and silicon pulses." />
    <meta property="og:title" content="Global Tech Infrastructure Nexus" />
    <meta property="og:description" content="Cinematic scroll-driven journey from orbit to circuit." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
${css.map((href) => `    <link rel="stylesheet" href="${href}" />`).join("\n")}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${BASE}assets/${entry}"></script>
  </body>
</html>
`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
writeFileSync(join(CLIENT_DIR, "404.html"), html);
writeFileSync(join(CLIENT_DIR, ".nojekyll"), "");

console.log(`[gh-pages] Wrote index.html + 404.html + .nojekyll into ${CLIENT_DIR}`);
console.log(`[gh-pages] Base path: ${BASE}`);
console.log(`[gh-pages] Entry: ${entry}`);
console.log(`[gh-pages] CSS: ${css.length} file(s)`);
