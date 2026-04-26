/**
 * Standalone Vite config used to build a pure client-side SPA bundle for
 * GitHub Pages. This bypasses the TanStack Start SSR plugin and produces a
 * single entry that bootstraps the router via `createRoot`.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";

const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
    target: "es2020",
    rollupOptions: {
      input: path.resolve(__dirname, "spa.html"),
    },
  },
});
