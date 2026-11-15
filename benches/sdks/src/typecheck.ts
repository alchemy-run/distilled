/**
 * Consumer typecheck cost: `tsc --noEmit` on the same 1-auth + 1-operation
 * program, typed against the published declarations (`lib/*.d.ts`,
 * `skipLibCheck`), the way an application that depends on the SDK sees it.
 * The program is not cast, so a type error here is a real consumer error.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveImports, type Target } from "./targets.ts";
import { BENCH_DIR, EFFECT_HTTP, OUT, run } from "./util.ts";

export interface TypecheckResult {
  readonly wallMs: number;
  readonly peakRss: number;
  readonly checkMs?: number;
  readonly files?: number;
  readonly types?: number;
  readonly errors: number;
  readonly firstError?: string;
}

const TSC = join(BENCH_DIR, "node_modules", ".bin", "tsc");

const fixture = (target: Target) => {
  const imports = resolveImports(target)
    .map((i) => `import * as ${i.alias} from ${JSON.stringify(i.lib)};`)
    .join("\n");
  return `${imports}
import * as FetchHttpClient from "${EFFECT_HTTP}/FetchHttpClient";

const layer = Layer.mergeAll(${target.auth}, FetchHttpClient.layer);
const program = Effect.suspend(() => ${target.call}).pipe(Effect.provide(layer));

export const main = () => Effect.runPromise(program);
`;
};

const TSCONFIG = {
  compilerOptions: {
    target: "ESNext",
    module: "Preserve",
    moduleResolution: "Bundler",
    lib: ["ESNext", "DOM"],
    types: [],
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    allowJs: false,
  },
  files: ["index.ts"],
};

const num = (out: string, label: string): number | undefined => {
  const m = new RegExp(`^${label}:\\s+([\\d.,]+)`, "m").exec(out);
  return m ? Number(m[1]!.replace(/,/g, "")) : undefined;
};

export const typecheckSource = async (name: string, source: string): Promise<TypecheckResult> => {
  const dir = join(OUT, "typecheck", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.ts"), source);
  writeFileSync(join(dir, "tsconfig.json"), JSON.stringify(TSCONFIG, null, 2));
  const res = await run(TSC, ["-p", dir, "--extendedDiagnostics"], {
    cwd: dir,
    timeoutMs: 600_000,
  });
  const out = res.stdout + res.stderr;
  const errorLines = out.split("\n").filter((l) => /error TS\d+/.test(l));
  const check = /^Check time:\s+([\d.]+)s/m.exec(out);
  return {
    wallMs: res.wallMs,
    peakRss: res.peakRss,
    ...(check ? { checkMs: Number(check[1]) * 1000 } : {}),
    files: num(out, "Files"),
    types: num(out, "Types"),
    errors: errorLines.length,
    ...(errorLines.length ? { firstError: errorLines[0]!.replace(dir, "").slice(0, 300) } : {}),
  };
};

export const typecheck = (target: Target, name = target.pkg) =>
  typecheckSource(name, fixture(target));

export const BASELINE_TYPECHECK = `import * as Effect from "effect/Effect";
export const main = () => Effect.runPromise(Effect.succeed(1));
`;
