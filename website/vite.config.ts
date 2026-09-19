import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { siteData } from "./build/plugin.ts";

/**
 * Static site. Every route is prerendered at build time into `dist/`; no
 * server runs in production. The Cloudflare Worker in `worker.ts` only
 * fronts the asset bucket to set headers on mirrors.
 *
 * `siteData` provides the `site:*` virtual modules, computed from the repo
 * at build time — package catalogue, patch stats, benchmarks and Alchemy
 * usage — so every build carries the latest numbers.
 */
export default defineConfig(({ command, isPreview }) => {
  // `alchemy dev` runs this command as a child of the CLI, which sets
  // `NODE_ENV=production` for itself. Vite keeps an inherited value, so the
  // dev server would come up in production mode and SolidStart would look for
  // a built client manifest that does not exist — every route 500s with
  // "No entry found in vite manifest for 'src/entry-client.tsx'".
  if (command === "serve" && !isPreview) process.env.NODE_ENV = "development";

  return {
    plugins: [
      siteData(),
      tailwindcss(),
      // The dev overlay imports `@jridgewell/resolve-uri`, which ships only a
      // UMD build; the browser cannot find its default export, so the overlay
      // fails to load and throws on every dev page load. Off until upstream
      // ships an ESM-safe build.
      solidStart({ devOverlay: false }),
      nitro({
        preset: "static",
        // Nitro also treats `publicDir` as a static root while serving, so
        // pointing it at the build output would make a previous `dist/` shadow
        // the dev server — `/` would resolve to the stale `dist/index.html`.
        // Only redirect the output when something is actually being built.
        ...(command === "build" || isPreview
          ? { output: { dir: "dist", publicDir: "dist" } }
          : {}),
        prerender: {
          routes: ["/", "/bench", "/shame"],
          crawlLinks: false,
          failOnError: true,
          // `/bench` → `bench.html`, which is how the Cloudflare asset router
          // resolves extension-less paths.
          autoSubfolderIndex: false,
        },
      }),
    ],
  };
});
