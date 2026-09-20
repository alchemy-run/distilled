/**
 * Vite plugin exposing `collectSiteData()` to the app.
 *
 * Each page imports its own slice as a virtual module — `site:home`,
 * `site:shame`, `site:bench` — resolved once per build, so route components
 * import plain JSON and have no filesystem or network access of their own.
 * The brand-mark sprite is emitted once as `/icons.svg` and referenced by
 * `<use href="/icons.svg#i-<dir>">` from every card.
 */
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { collectSiteData, invalidateSiteData } from "./site-data.ts";

const SPRITE_PATH = "/icons.svg";
const SLICES = ["home", "shame", "bench"] as const;
type Slice = (typeof SLICES)[number];

const isSlice = (id: string): id is `site:${Slice}` =>
  SLICES.some((slice) => id === `site:${slice}`);

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));

export const siteData = (): Plugin => {
  const load = () => collectSiteData(websiteRoot);
  return {
    name: "distilled:site-data",
    // In dev, a `pnpm generate` or an edited data file should show on the
    // next reload rather than sticking to the first collection.
    handleHotUpdate: invalidateSiteData,
    resolveId(id) {
      return isSlice(id) ? `\0${id}` : undefined;
    },
    async load(id) {
      if (!id.startsWith("\0site:")) return;
      const slice = id.slice("\0site:".length) as Slice;
      const data = await load();
      return `export default ${JSON.stringify(data[slice])};`;
    },
    async generateBundle() {
      if (this.environment.name !== "client") return;
      this.emitFile({
        type: "asset",
        fileName: SPRITE_PATH.slice(1),
        source: (await load()).sprite,
      });
    },
    configureServer(server) {
      server.middlewares.use(SPRITE_PATH, async (_req, res) => {
        res.setHeader("content-type", "image/svg+xml");
        res.end((await load()).sprite);
      });
    },
  };
};
