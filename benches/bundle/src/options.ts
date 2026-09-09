/**
 * Rolldown options mirroring what Alchemy's bundler applies
 * (`packages/alchemy/src/Bundle/Bundle.ts` + the Worker/Lambda callers).
 * Values are re-declared here rather than imported so the bench does not
 * depend on `alchemy`.
 */
import type { InputOptions, OutputOptions, Plugin } from "rolldown";
import { purePlugin, type PurePluginStats } from "./pure-plugin.ts";

/** `Bundle.BUN_CONDITION_NAMES` — never `import` / `require`. */
export const BUN_CONDITION_NAMES: readonly string[] = [
  "bun",
  "module",
  "default",
];
/** `Bundle.NODE_CONDITION_NAMES`. */
export const NODE_CONDITION_NAMES: readonly string[] = [
  "node",
  "module",
  "default",
];
/** `@alchemy.run/cloudflare-runtime/rolldown` `DEFAULT_RESOLVE_CONDITION_NAMES` + production. */
export const WORKER_CONDITION_NAMES: readonly string[] = [
  "workerd",
  "worker",
  "module",
  "browser",
  "production",
];

export type ConditionSet = "bun" | "node" | "worker";

export const conditionNames = (set: ConditionSet): readonly string[] =>
  set === "bun"
    ? BUN_CONDITION_NAMES
    : set === "node"
      ? NODE_CONDITION_NAMES
      : WORKER_CONDITION_NAMES;

export interface BuildVariant {
  /** Which `resolve.conditionNames` set to use. */
  readonly conditions: ConditionSet;
  /** Run the PURE annotator (Alchemy default: on). */
  readonly pure: boolean;
  /** `output.minify` — Alchemy Workers: `true`; Lambda: `false` → "dce-only". */
  readonly minify: boolean;
}

export const variantId = (v: BuildVariant): string =>
  `${v.conditions}${v.pure ? "" : "+nopure"}${v.minify ? "" : "+nominify"}`;

export const inputOptions = (
  entry: string,
  cwd: string,
  variant: BuildVariant,
  stats: PurePluginStats,
): InputOptions => {
  const plugins: Plugin[] = [];
  if (variant.pure) plugins.push(purePlugin({ stats }));
  return {
    input: entry,
    cwd,
    // Alchemy Lambda bundles use `platform: "node"`; Workers use "neutral" +
    // the cloudflare-runtime plugin's nodejs_compat shims. `node` keeps
    // `node:*` imports external without extra plugins.
    platform: "node",
    resolve: { conditionNames: [...conditionNames(variant.conditions)] },
    plugins,
    // `Bundle.ALCHEMY_DEFINE`
    transform: { define: { "globalThis.__ALCHEMY_RUNTIME__": "true" } },
    // `Bundle.build` default optimisation.
    optimization: { inlineConst: { mode: "smart", pass: 3 } },
    treeshake: true,
    checks: { unresolvedImport: false, ineffectiveDynamicImport: false },
    logLevel: "silent",
  };
};

export const outputOptions = (
  dir: string,
  variant: BuildVariant,
): OutputOptions => ({
  format: "esm",
  dir,
  entryFileNames: "index.js",
  codeSplitting: false,
  // Worker bundle settings (`Cloudflare/Workers/Sources/Rolldown.ts`).
  sourcemap: "hidden",
  minify: variant.minify ? true : "dce-only",
  keepNames: true,
  strictExecutionOrder: true,
});
