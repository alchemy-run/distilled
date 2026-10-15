/**
 * Bundle size of "1 auth + 1 operation" per SDK, with rolldown and
 * Alchemy's settings (reused from benches/bundle: `bun` conditions → TS
 * sources, PURE annotator, minify, tree-shake).
 *
 * Each fixture builds the credentials layer and one call from its target,
 * provides `FetchHttpClient.layer`, and exports a `fetch` handler. Two
 * baselines bound the cost of Effect itself:
 *
 *   effect-minimal  Effect.runPromise(Effect.succeed(1))
 *   effect-http     the same request written by hand with Effect: a
 *                   Context service holding a Redacted token, HttpClient +
 *                   FetchHttpClient, a Schema-decoded JSON body
 *
 * "distilled overhead" = SDK bundle − effect-http.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { rolldown } from "rolldown";
import { inputOptions, outputOptions, type BuildVariant } from "../../bundle/src/options.ts";
import type { PurePluginStats } from "../../bundle/src/pure-plugin.ts";
import { resolveImports, type Target } from "./targets.ts";
import { BENCH_DIR, EFFECT_HTTP, OUT } from "./util.ts";

const VARIANT: BuildVariant = { conditions: "bun", pure: true, minify: true };

export interface BundleResult {
  readonly bytes: number;
  readonly gzip: number;
  readonly brotli: number;
  readonly modules: number;
  readonly buildMs: number;
  /** Rendered (post-shake, pre-minify) bytes by origin. */
  readonly composition: { effect: number; core: number; sdk: number; other: number };
  readonly warnings?: string[];
}

export const fixtureSource = (target: Target): string => {
  const imports = resolveImports(target)
    .map((i) => `import * as ${i.alias} from ${JSON.stringify(i.src)};`)
    .join("\n");
  return `${imports}
import * as FetchHttpClient from "${EFFECT_HTTP}/FetchHttpClient";

const layer = Layer.mergeAll(${target.auth}, FetchHttpClient.layer);
const program = Effect.suspend(() => ${target.call}).pipe(Effect.provide(layer));

export default {
  fetch: () => Effect.runPromise(program as Effect.Effect<unknown, unknown>).then(() => new Response("ok")),
};
`;
};

export const BASELINES: Record<string, { description: string; source: string }> = {
  "effect-minimal": {
    description: "Effect.runPromise(Effect.succeed(1)) — the floor any Effect program pays",
    source: `import * as Effect from "effect/Effect";
export default { fetch: () => Effect.runPromise(Effect.succeed(1)).then((n) => new Response(String(n))) };
`,
  },
  "effect-http": {
    description:
      "one authenticated GET written by hand with Effect: Context service + Redacted token + HttpClient/FetchHttpClient + Schema-decoded JSON",
    source: `import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "${EFFECT_HTTP}/FetchHttpClient";
import * as HttpClient from "${EFFECT_HTTP}/HttpClient";
import * as HttpClientRequest from "${EFFECT_HTTP}/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";

class Token extends Context.Service<Token, Redacted.Redacted<string>>()("Token") {}
const Item = Schema.Struct({ id: Schema.String, name: Schema.optional(Schema.String) });
const Items = Schema.Struct({ items: Schema.Array(Item) });

const program = Effect.gen(function* () {
  const token = yield* Token;
  const client = yield* HttpClient.HttpClient;
  const response = yield* client.execute(
    HttpClientRequest.get("https://api.example.com/v1/items").pipe(
      HttpClientRequest.bearerToken(Redacted.value(token)),
    ),
  );
  return yield* Schema.decodeUnknownEffect(Items)(yield* response.json);
}).pipe(
  Effect.provide(Layer.mergeAll(Layer.succeed(Token, Redacted.make(process.env.TOKEN ?? "")), FetchHttpClient.layer)),
);

export default { fetch: () => Effect.runPromise(program).then((r) => new Response(String(r.items.length))) };
`,
  },
};

const origin = (id: string, pkg: string | undefined): keyof BundleResult["composition"] => {
  if (
    /[\\/]node_modules[\\/](\.pnpm[\\/]effect@[^\\/]+[\\/]node_modules[\\/])?effect[\\/]/.test(id)
  )
    return "effect";
  if (id.includes("/packages/core/")) return "core";
  if (pkg && id.includes(`/packages/${pkg}/`)) return "sdk";
  return "other";
};

export const bundle = async (name: string, source: string, pkg?: string): Promise<BundleResult> => {
  const dir = join(OUT, "bundle", name);
  mkdirSync(dir, { recursive: true });
  const entry = join(dir, "entry.ts");
  writeFileSync(entry, source);
  const stats: PurePluginStats = {
    matchedModules: 0,
    annotatedModules: 0,
    annotations: 0,
    sideEffectFreeModules: 0,
  };
  const warnings: string[] = [];
  const t0 = performance.now();
  const b = await rolldown({
    ...inputOptions(entry, BENCH_DIR, VARIANT, stats),
    onLog(level, log) {
      if (level === "warn") warnings.push(String(log.message ?? log).slice(0, 200));
    },
  });
  const out = await b.write(outputOptions(join(dir, "dist"), VARIANT));
  await b.close();
  const buildMs = performance.now() - t0;
  const chunk = out.output.find((o) => o.type === "chunk" && o.isEntry);
  if (!chunk || chunk.type !== "chunk") throw new Error("no entry chunk");
  const composition = { effect: 0, core: 0, sdk: 0, other: 0 };
  for (const [id, m] of Object.entries(chunk.modules))
    composition[origin(id, pkg)] += m.renderedLength;
  const code = Buffer.from(chunk.code);
  return {
    bytes: code.byteLength,
    gzip: gzipSync(code, { level: 9 }).byteLength,
    brotli: brotliCompressSync(code).byteLength,
    modules: chunk.moduleIds.length,
    buildMs,
    composition,
    ...(warnings.length ? { warnings: warnings.slice(0, 5) } : {}),
  };
};
