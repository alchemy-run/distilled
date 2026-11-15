// Build the dashboard into one self-contained HTML file you can send to someone.
//
//   pnpm single            -> dist-single/distilled-bench.html
//
// Run files are slimmed to the fields the page reads (see slim.mjs),
// and the JS, CSS, fonts and favicon are inlined. The file works offline.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build } from "vite";
import { slimRun } from "./slim.mjs";

const root = join(import.meta.dirname, "..");
const tmp = join(root, "node_modules", ".single-build");
const outDir = join(root, "dist-single");

const slimRuns = {
  name: "slim-runs",
  enforce: "pre",
  load(id) {
    if (!/[\\/]runs[\\/][^\\/]+\.json$/.test(id)) return null;
    return JSON.stringify(slimRun(JSON.parse(readFileSync(id, "utf8"))));
  },
};

rmSync(tmp, { recursive: true, force: true });
await build({
  root,
  configFile: false,
  logLevel: "warn",
  plugins: [slimRuns],
  build: {
    outDir: tmp,
    emptyOutDir: true,
    assetsInlineLimit: 1e9,
    cssCodeSplit: false,
    modulePreload: false,
  },
});

const assets = join(tmp, "assets");
const read = (name) => readFileSync(join(assets, name), "utf8");
const dataUri = (path, mime) => `data:${mime};base64,${readFileSync(path).toString("base64")}`;
let css = readdirSync(assets)
  .filter((f) => f.endsWith(".css"))
  .map(read)
  .join("\n");
for (const font of readdirSync(join(root, "public", "fonts")))
  css = css.replaceAll(
    `/fonts/${font}`,
    dataUri(join(root, "public", "fonts", font), "font/woff2"),
  );
const js = readdirSync(assets)
  .filter((f) => f.endsWith(".js"))
  .map(read)
  .join("\n");

let html = readFileSync(join(tmp, "index.html"), "utf8");
html = html
  .replace(/<link rel="preload"[^>]*>\s*/g, "")
  .replace(/<link rel="stylesheet"[^>]*>/g, () => `<style>${css}</style>`)
  .replace(
    /<script type="module"[^>]*src="[^"]*"><\/script>/g,
    () => `<script type="module">${js.replaceAll("</script", "<\\/script")}</script>`,
  )
  .replace(
    /href="\/favicon\.svg"/,
    () => `href="${dataUri(join(root, "public", "favicon.svg"), "image/svg+xml")}"`,
  );

mkdirSync(outDir, { recursive: true });
const file = join(outDir, "distilled-bench.html");
writeFileSync(file, html);
rmSync(tmp, { recursive: true, force: true });
console.log(`${file} (${(Buffer.byteLength(html) / 1e6).toFixed(2)} MB)`);
