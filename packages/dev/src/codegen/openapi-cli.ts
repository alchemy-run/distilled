/**
 * OpenAPI → Smithy pipeline helper (dev-time only, provider-agnostic).
 *
 * Owns the spec-side pipeline every OpenAPI-sourced provider shares: read the
 * spec file, convert it with {@link convertOpenApiToSmithy} (upstream names,
 * the verbNoun names deferred), and write `.generated-specs/<name>.json`;
 * then {@link finalizeConvert} applies the package's RFC-6902 patches (Smithy
 * ops only: `/shapes`, `/metadata`) and the deferred names, so patches target
 * the names the spec gives. Stale targets fail unless `onStalePatch: "warn"`.
 *
 * A provider's `scripts/convert.ts` is: a `runOpenApiConvert` call.
 * `scripts/generate.ts` compiles the already-patched models and does not
 * apply patches.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { convertOpenApiToSmithy, type OpenApiConvertOptions } from "./openapi.ts";
import { finalizeConvert } from "./patches.ts";
import { resolveSpecPath } from "./spec-path.ts";

export interface OpenApiSpecEntry {
  /** Output model name — written to `<outDir>/<name>.json`. */
  readonly name: string;
  /** Spec file path, relative to `root` (or absolute). */
  readonly specPath: string;
  /**
   * Hook between reading and conversion (e.g. path prefixing, server
   * rewrites). May mutate the spec in place or return a replacement.
   */
  readonly preprocess?: (spec: any) => unknown | void | Promise<unknown | void>;
  /** Per-spec converter option overrides (merged over the shared options). */
  readonly options?: Partial<OpenApiConvertOptions>;
}

export interface RunOpenApiConvertOptions {
  /** Absolute package root (usually `path.resolve(import.meta.dirname, "..")`). */
  readonly root: string;
  readonly specs: readonly OpenApiSpecEntry[];
  /**
   * RFC-6902 patch root, relative to `root`. Default `"patches"`; `false`
   * disables. Layout: `<patchesDir>/<name>/*.json` when the per-spec
   * directory exists; for single-spec providers a flat `<patchesDir>/*.json`
   * also works. Every op targets the Smithy model (`/shapes`, `/metadata`).
   */
  readonly patchesDir?: string | false;
  /** Output directory, relative to `root`. Default `".generated-specs"`. */
  readonly outDir?: string;
  /**
   * Spec text parser. Default `JSON.parse` — the seam for YAML specs
   * (`parse: (text) => YAML.parse(text)`).
   */
  readonly parse?: (text: string, specPath: string) => unknown;
  /** Shared converter options (per-spec `options` merge over these). */
  readonly options: OpenApiConvertOptions;
  /**
   * What to do when a patch JSON pointer does not resolve. Default `"fail"`:
   * silent skip is how a whole patch chain can vanish after an upstream path
   * prefix change. `"warn"` restores the old skip-and-continue behaviour.
   */
  readonly onStalePatch?: "fail" | "warn";
  /**
   * Run {@link finalizeConvert} on the written models (Smithy patches,
   * deferred names, reference check, finalized marker). Default true. Pass
   * false when the caller finalizes once after several convert steps (Fly
   * machines + sprites + addons); its finalizeConvert must then apply the
   * Smithy patches, from `patches/<name>/`.
   */
  readonly finalize?: boolean;
}

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

/** Run the OpenAPI→Smithy conversion pipeline (plain async — call from a script). */
export const runOpenApiConvert = async (o: RunOpenApiConvertOptions): Promise<void> => {
  const outDir = path.resolve(o.root, o.outDir ?? ".generated-specs");
  const patchRoot =
    o.patchesDir === false ? undefined : path.resolve(o.root, o.patchesDir ?? "patches");
  const parse = o.parse ?? ((text: string) => JSON.parse(text));
  const onStalePatch = o.onStalePatch ?? "fail";

  await fs.mkdir(outDir, { recursive: true });

  console.log("🛠️  openapi → smithy");
  console.log(`   Output: ${outDir}`);

  // Each spec's patch dir, relative to the patch root: `<name>/` when it
  // exists, else the root itself for a single-spec provider.
  const patchDirs = new Map<string, string>();
  if (patchRoot && (await exists(patchRoot))) {
    for (const entry of o.specs) {
      if (await exists(path.join(patchRoot, entry.name))) patchDirs.set(entry.name, entry.name);
      else if (o.specs.length === 1) patchDirs.set(entry.name, "");
    }
  }

  for (const entry of o.specs) {
    // Production path by default; `specs/.local` under DISTILLED_SPECS_LOCAL.
    const specPath = resolveSpecPath(o.root, entry.specPath);
    let spec: any = parse(await fs.readFile(specPath, "utf8"), specPath);

    // ---- Preprocess hook ----
    if (entry.preprocess) {
      const replaced = await entry.preprocess(spec);
      if (replaced !== undefined) spec = replaced;
    }

    // ---- Convert, write ----
    const model = convertOpenApiToSmithy(spec, {
      deferNaming: true,
      ...o.options,
      ...entry.options,
    });
    const opCount = Object.values(model.shapes).filter((s: any) => s.type === "operation").length;
    const outPath = path.join(outDir, `${entry.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(model, null, 2) + "\n");
    console.log(
      `   ✅ ${entry.name}: ${opCount} operations, ${Object.keys(model.shapes).length} shapes`,
    );
  }

  if (o.finalize !== false) {
    const written = new Set(o.specs.map((s) => s.name));
    await finalizeConvert({
      root: o.root,
      outDir,
      patchesDir: patchRoot ?? false,
      patchesFor: (resource) => patchDirs.get(resource),
      onStalePatch,
      // The converter computed the names; finalize only applies them.
      operationNaming: "as-is",
      include: (resource) => written.has(resource),
    });
  }
};
