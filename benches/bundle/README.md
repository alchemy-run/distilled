# benches/bundle — rolldown bundle bench

Measures what a consumer pays for a Distilled SDK when bundling with
**rolldown 1.2.5** the way Alchemy does: bundle time, output bytes (raw and
gzip), and tree-shake quality. Measurements only — nothing here fails CI.

```sh
pnpm bench:bundle                    # from the repo root
bun benches/bundle/run.ts            # same thing
bun benches/bundle/run.ts --only aws-s3-deep,cf-workers-deep --runs 5
bun benches/bundle/run.ts --all-variants --keep     # keep .out/<fixture>/<variant>/index.js
```

Flags: `--runs N` (builds per fixture; default `$BENCH_RUNS`, then 3),
`--only a,b`, `--variants bun,bun+nopure,bun+nominify`, `--all-variants`,
`--keep` (leave bundles in `.out/`), `--json` (print the slim artifact JSON
to stdout instead of the markdown, for piping), `--out <file>` (write the
slim committed artifact; see `results/README.md`).
`pnpm --filter @distilled.cloud/bench-bundle record` refreshes
`results/latest.json`, which the website reads at build time.

Output: markdown to stdout, plus `.out/report.md` and `.out/results.json`
(per-module composition and per-service analysis). `.out/` is gitignored.

## What is measured

| column       | meaning                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------- |
| cold         | first `rolldown()` + `write()` in a fresh `bun` process (native binding load, resolver caches)  |
| warm         | median of the remaining runs in the same process                                                 |
| bytes / gzip | the single ESM entry chunk, minified                                                             |
| modules      | modules in the chunk's graph                                                                     |
| tree-shake   | ✅ / leaked markers, and `retained/total` operations of each service the fixture imports         |

Tree-shake checks grep the minified bundle for string literals that survive
minification: AWS `operationName: "X"` and Cloudflare route `uri: "/…"`. Each
fixture lists what must be present (the op it calls) and what must be absent
(other ops of the same service, other services, the other provider).

The composition section counts rolldown's *rendered* module sizes (after
tree-shaking, before minification) and, for each `packages/*/src/services/*.ts`
module, splits the retained top-level bindings into endpoint rules, error
classes, schemas and operations, flagging bindings that are **unreferenced**
(kept only because rolldown could not prove the initializer pure).

## How this mirrors Alchemy

Settings are re-declared in `src/options.ts` (Alchemy is not a dependency):

- `resolve.conditionNames = ["bun", "module", "default"]` — Alchemy's
  `BUN_CONDITION_NAMES`; never `import`/`require`. This resolves
  `@distilled.cloud/*` to the workspace **`src/*.ts`** (the `bun` export
  condition), the same files an Alchemy worker sees via `"bun": "./src/…"`.
  `NODE_CONDITION_NAMES` and the Cloudflare Worker set (`workerd, worker,
  module, browser, production`) are available as variants; they resolve to the
  same distilled sources.
- `platform: "node"`, `treeshake: true`, `transform.define
  {"globalThis.__ALCHEMY_RUNTIME__": "true"}`, `optimization.inlineConst
  {mode: "smart", pass: 3}` — from `Bundle.build`.
- Output: `format: "esm"`, `minify: true`, `keepNames: true`,
  `strictExecutionOrder: true`, `sourcemap: "hidden"` — from
  `Cloudflare/Workers/Sources/Rolldown.ts`. `+nominify` uses `"dce-only"`
  (Alchemy's Lambda default).
- **PURE annotator**: `src/pure-plugin.ts` is a dependency-free port of
  Alchemy's `Bundle/PurePlugin.ts` (`alchemy:annotate-pure`) with the same
  rules — `/*#__PURE__*/` on top-level bound calls in `effect`, `@effect/*`,
  `alchemy`, `@alchemy.run/*`, `@distilled.cloud/*`; discarded-result calls
  and `moduleSideEffects: false` only for packages declaring
  `"sideEffects": false | []` (all distilled packages do). Differences:
  picomatch replaced by a `name` / `@scope/*` matcher; no cross-build anchor
  cache. The `+nopure` variant disables it so the report shows what it buys.

Not mirrored: Alchemy's `@alchemy.run/cloudflare-runtime/rolldown` plugin
(nodejs_compat shims, virtual entries), `rawPlugin`, and the bundle analyzer.
None of them affect how distilled modules shake.

## Fixtures (`fixtures/`)

| fixture              | imports                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| `aws-s3-deep`        | `@distilled.cloud/aws/s3` + `/Credentials`; calls `getObject`              |
| `aws-barrel`         | `@distilled.cloud/aws` root barrel (+ `/s3`); same call                    |
| `aws-services-index` | `@distilled.cloud/aws/index` — all ~430 services as namespaces; `S3.getObject` |
| `cf-workers-deep`    | `@distilled.cloud/cloudflare/workers` + `/Credentials`; `listScripts.items` |
| `cf-barrel`          | `@distilled.cloud/cloudflare` root barrel (`Services.workers`); same call  |
| `combined-worker`    | S3 `getObject` + Workers `listScripts` — an Alchemy-worker-shaped entry    |

Each entry provides real layers (`Credentials.fromCredentials` /
`fromApiToken`, `FetchHttpClient.layer`) and exports a `fetch` handler that
runs the effect, so the operation is a live root for rolldown.

## Adding a fixture

1. Add `fixtures/<name>.ts` with a `default export` that references the
   operation(s).
2. Register it in `src/fixtures.ts` with `expect` / `forbid` markers and the
   `services` whose op counts to report.

## First results (2026-09-09, rolldown 1.2.5, bun 1.3.13, repo @ c7b11bc6b)

| fixture            | variant    |    cold |    warm |    bytes |     gzip | modules | tree-shake                                    |
| ------------------ | ---------- | ------: | ------: | -------: | -------: | ------: | --------------------------------------------- |
| aws-s3-deep        | bun        |  ~320ms |  ~320ms | 410.7 KB | 118.4 KB |     222 | ✅ s3: 1/112 ops                              |
| aws-s3-deep        | bun+nopure |  ~150ms |  ~150ms | 412.3 KB | 118.9 KB |     222 | ✅ s3: 1/112 ops                              |
| aws-barrel         | bun        |  ~320ms |  ~310ms | 410.7 KB | 118.7 KB |     222 | ✅ s3: 1/112 ops                              |
| aws-services-index | bun        | ~4200ms | ~4500ms | 410.7 KB | 118.4 KB |     222 | ✅ s3: 1/112 ops                              |
| cf-workers-deep    | bun        |  ~300ms |  ~290ms | 222.2 KB |  61.7 KB |     106 | ✅ workers: 1/74 ops                          |
| cf-workers-deep    | bun+nopure |  ~120ms |  ~120ms | 225.2 KB |  62.6 KB |     106 | ✅ workers: 1/74 ops                          |
| cf-barrel          | bun        | ~1600ms | ~1550ms | 222.2 KB |  61.7 KB |     106 | ✅ workers: 1/74 ops                          |
| combined-worker    | bun        |  ~450ms |  ~410ms | 464.8 KB | 129.7 KB |     234 | ✅ s3: 1/112 ops · workers: 1/74 ops          |

Timings are one laptop run; treat ±30% as noise. Bytes are stable.

### Findings

1. **Service-level shaking works.** No operation from an un-imported service
   and no other operation of the imported service survives in any fixture
   (`operationName` / route `uri` literals: exactly 1 per used op).
2. **Barrels cost bundle time, not bytes.** `@distilled.cloud/aws/index`
   (all ~430 services) and `@distilled.cloud/cloudflare` (`Services.*`,
   ~120 services) produce byte-identical output to the deep import, but
   rolldown must parse and PURE-annotate every service module: 4.2 s vs
   0.3 s (AWS), 1.6 s vs 0.3 s (Cloudflare). The `aws` root barrel
   (`Auth`, `Credentials`, … namespaces, no services) is free.
3. **The PURE annotator buys ~0.5–1.5% bytes and costs ~2× bundle time**
   on these fixtures (410.7 vs 412.3 KB; 222.2 vs 225.2 KB) — the generated
   services are already `/*@__PURE__*/`-annotated at the top level, so the
   plugin mostly helps `effect`'s own `dist/`. Its cost is parsing every
   matched module with oxc in JS (~180 modules → +170 ms; ~620 modules →
   +4 s for the AWS index barrel).
4. **What survives inside a service module is not the operations** — it is
   two generated shapes rolldown cannot prove pure, plus S3's endpoint
   resolver:
   - `packages/aws/src/services/s3.ts` (92 KB rendered, ~42 KB minified):
     **75%** is the `EndpointResolver` rules function (needed by the op —
     not a shake failure, but the largest single cost of using S3), **8.9 KB**
     is 49 error classes of which **39 are unreferenced**
     (`class X extends /*@__PURE__*/ S.TaggedError()(…).pipe(C.withY) {}` —
     the annotation sits on the inner call, the outer `.pipe(...)` in class
     heritage is not annotated, so the class is kept), and 12 unreferenced
     list/union schemas (`S.Array(Inner.pipe(T.XmlName(…)).annotate(…))`).
   - `packages/cloudflare/src/services/workers.ts` (65.5 KB rendered, ~27 KB
     minified): **141 of 170 retained bindings (46.6 KB rendered, ≈19 KB
     minified, ~70% of the module) are unreferenced.** 106 are
     `/*@__PURE__*/ S.Unknown.pipe(T.UnionCases([...]))` schemas — the outer
     `.pipe` is annotated but the inner `T.UnionCases(...)` argument is not,
     and rolldown treats an unannotated call argument as a side effect. The
     opaque `Unknown.pipe(UnionCases(keySets))` form itself is intentional
     for Cloudflare object unions; the missing inner annotation is the
     shake bug. Of the 107 such schemas in `workers.ts`, 44 have only empty
     key-sets (`UnionCases([[], []])` — scalar/array unions such as
     `boolean | string[]`, where the annotation carries no information). 35
     are error classes of the same
     `class X extends /*@__PURE__*/ T.applyErrorMatchers(/*@__PURE__*/ S.TaggedError()(…)) {}`
     shape. Verified with a micro-fixture: annotating the inner
     `UnionCases(...)` call, and hoisting the class heritage expression into a
     `/*@__PURE__*/ const` that the class extends, both shake to zero.
5. **Where the bytes go overall** (S3 fixture, rendered): `effect` 50%,
   `@distilled.cloud/aws` 22% (of which s3.ts 92 KB, protocol/rules-engine/
   client the rest), `@smithy/*` + `@aws-sdk/credential-providers` chain ~10%,
   `fast-xml-parser` 6%. The Cloudflare fixture is `effect` 78%,
   `@distilled.cloud/cloudflare` 15%, `@distilled.cloud/core` 7%.
