/**
 * One bundler each, configured the way its users ship an app: minified, ESM
 * where the bundler emits it, code splitting where it splits by default.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { gzipSync } from "node:zlib";

/**
 * `node`: a server bundle. `browser`: a browser bundle. `workerd`: a
 * Cloudflare Worker bundle the way wrangler builds one (esbuild, one file,
 * the `workerd`, `worker` and `browser` conditions).
 */
export type Target = "node" | "browser" | "workerd";

export interface Bundle {
  /** The entry chunk. */
  readonly main: string;
  readonly errors: ReadonlyArray<string>;
  readonly warnings: ReadonlyArray<string>;
}

export interface Bundler {
  readonly name: "esbuild" | "rolldown" | "vite" | "webpack";
  readonly build: (entry: string, outDir: string, target: Target) => Promise<Bundle>;
}

const message = (e: unknown) => (e instanceof Error ? e.message : String(e)).split("\n")[0]!;

export const esbuild: Bundler = {
  name: "esbuild",
  build: async (entry, outDir, target) => {
    const { build } = await import("esbuild");
    const main = path.join(outDir, "main.mjs");
    try {
      const result = await build({
        entryPoints: { main: entry },
        outdir: outDir,
        bundle: true,
        format: "esm",
        minify: true,
        logLevel: "silent",
        outExtension: { ".js": ".mjs" },
        ...(target === "workerd"
          ? {
              platform: "browser",
              conditions: ["workerd", "worker", "browser"],
              external: ["node:*", "cloudflare:*"],
            }
          : { platform: target, splitting: true }),
      });
      return { main, errors: [], warnings: result.warnings.map((w) => w.text) };
    } catch (e) {
      const failure = e as { errors?: Array<{ text: string }> };
      return { main, errors: failure.errors?.map((x) => x.text) ?? [message(e)], warnings: [] };
    }
  },
};

export const rolldown: Bundler = {
  name: "rolldown",
  build: async (entry, outDir, target) => {
    const { rolldown: bundle } = await import("rolldown");
    const warnings: string[] = [];
    const main = path.join(outDir, "main.mjs");
    try {
      const build = await bundle({
        input: { main: entry },
        platform: target === "node" ? "node" : "browser",
        logLevel: "warn",
        onLog: (level, log) => {
          if (level === "warn") warnings.push(log.message);
        },
      });
      await build.write({
        dir: outDir,
        format: "esm",
        minify: true,
        entryFileNames: "[name].mjs",
        chunkFileNames: "[name]-[hash].mjs",
      });
      await build.close();
      return { main, errors: [], warnings };
    } catch (e) {
      return { main, errors: [message(e)], warnings };
    }
  },
};

export const vite: Bundler = {
  name: "vite",
  build: async (entry, outDir, target) => {
    const { build, createLogger } = await import("vite");
    const warnings: string[] = [];
    const logger = createLogger("warn");
    logger.warn = (msg) => void warnings.push(msg);
    logger.warnOnce = (msg) => void warnings.push(msg);
    const main = path.join(outDir, "main.mjs");
    try {
      await build({
        configFile: false,
        envDir: false,
        root: path.dirname(entry),
        customLogger: logger,
        logLevel: "warn",
        // A server build bundles its dependencies too, as a deployed one must.
        ssr: { noExternal: true, target: "node" },
        build: {
          ssr: target === "node",
          outDir,
          emptyOutDir: true,
          copyPublicDir: false,
          minify: true,
          rolldownOptions: {
            input: { main: entry },
            output: {
              format: "es",
              entryFileNames: "[name].mjs",
              chunkFileNames: "[name]-[hash].mjs",
            },
          },
        },
      });
      return { main, errors: [], warnings };
    } catch (e) {
      return { main, errors: [message(e)], warnings };
    }
  },
};

export const webpack: Bundler = {
  name: "webpack",
  build: async (entry, outDir, target) => {
    const { default: compile } = await import("webpack");
    const main = path.join(outDir, "main.js");
    const result = await new Promise<{ errors: string[]; warnings: string[] }>((resolve) =>
      compile(
        {
          mode: "production",
          context: path.dirname(entry),
          entry: { main: entry },
          target: target === "node" ? "node" : "web",
          output: {
            path: outDir,
            filename: "[name].js",
            chunkFilename: "[name]-[contenthash].js",
            clean: true,
          },
          performance: { hints: false },
        },
        (err, stats) => {
          if (err || !stats) return resolve({ errors: [message(err)], warnings: [] });
          const json = stats.toJson({ all: false, errors: true, warnings: true });
          resolve({
            errors: (json.errors ?? []).map((e) => message(e.message)),
            warnings: (json.warnings ?? []).map((w) => message(w.message)),
          });
        },
      ),
    );
    // webpack's node target emits CommonJS.
    if (target === "node" && fs.existsSync(outDir)) {
      fs.writeFileSync(path.join(outDir, "package.json"), JSON.stringify({ type: "commonjs" }));
    }
    return { main, ...result };
  },
};

export const BUNDLERS: ReadonlyArray<Bundler> = [esbuild, rolldown, vite, webpack];

/** The JavaScript files a bundle wrote, and their size raw and gzipped. */
export const outputSize = (outDir: string) => {
  let files = 0;
  let bytes = 0;
  let gzip = 0;
  for (const name of fs.readdirSync(outDir, { recursive: true }) as string[]) {
    if (!/\.[cm]?js$/.test(name)) continue;
    const data = fs.readFileSync(path.join(outDir, name));
    files++;
    bytes += data.length;
    gzip += gzipSync(data).length;
  }
  return { files, bytes, gzip };
};
