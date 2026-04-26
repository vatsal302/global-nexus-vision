/**
 * Standalone client entry for static deployments (GitHub Pages).
 *
 * TanStack Start's default client entry calls `hydrateRoot(document, ...)`,
 * which assumes the SSR worker rendered the initial HTML. On GitHub Pages
 * there is no SSR worker, so we instead use `createRoot` to render the
 * router into a regular `<div id="root">`.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
