#!/usr/bin/env node
/**
 * Finalizes the standalone SPA build for GitHub Pages.
 *
 * - Renames spa.html -> index.html (Pages serves index.html by default).
 * - Copies index.html -> 404.html so deep links fall back to the SPA.
 * - Adds .nojekyll so GitHub Pages serves files starting with `_`.
 */

import {
  existsSync,
  readFileSync,
  writeFileSync,
  renameSync,
  unlinkSync,
} from "node:fs";
import { join } from "node:path";

const OUT = "dist/spa";
const SPA_HTML = join(OUT, "spa.html");
const INDEX_HTML = join(OUT, "index.html");
const NOT_FOUND_HTML = join(OUT, "404.html");
const NOJEKYLL = join(OUT, ".nojekyll");

if (!existsSync(SPA_HTML)) {
  console.error(
    `[gh-pages] ${SPA_HTML} not found. Run 'npm run build:spa' first.`,
  );
  process.exit(1);
}

if (existsSync(INDEX_HTML)) unlinkSync(INDEX_HTML);
renameSync(SPA_HTML, INDEX_HTML);

const html = readFileSync(INDEX_HTML, "utf8");
writeFileSync(NOT_FOUND_HTML, html);
writeFileSync(NOJEKYLL, "");

console.log(`[gh-pages] Wrote index.html + 404.html + .nojekyll into ${OUT}`);
console.log(`[gh-pages] Base path: ${process.env.VITE_BASE_PATH || "/"}`);
