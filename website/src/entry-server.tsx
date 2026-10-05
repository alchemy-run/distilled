// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

/**
 * Only runs at build time: every route is prerendered to static HTML (see
 * `vite.config.ts`). The inline script applies a stored theme before first
 * paint so there is no flash; it is deliberately not part of the app bundle.
 */
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0f0c12" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <script>{`try{const t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch{}`}</script>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
