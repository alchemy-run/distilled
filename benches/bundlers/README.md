# benches/bundlers — the published SDKs through every bundler

The published SDKs load parts of themselves on first use: each AWS wire
protocol, S3's checksum and event-stream code, the AWS credential providers,
the services a credential source or `layerS3` calls, and `cloudflare:sockets`.
Every load is an `import()` in `lib/`. This suite bundles a program that
triggers each of them with esbuild, rolldown, Vite and webpack, and with
wrangler's esbuild settings, then:

- **checks** (`pnpm test`, the CI `Bundlers` job) that each bundle builds with
  no errors, and that each bundle that can run in Node prints the same lines
  as the unbundled program, with no "failed to load";
- **measures** (`pnpm bench:bundlers`) bundle time and output size.

```sh
pnpm bench:bundlers                                   # from the repo root
node benches/bundlers/run.ts --runs 5 --only esbuild,vite
node benches/bundlers/run.ts --no-build               # reuse the current lib/
pnpm --filter @distilled.cloud/bench-bundlers test    # the check
BUNDLERS_BUILD=0 pnpm --filter @distilled.cloud/bench-bundlers test
```

`--keep` (bench) or `BUNDLERS_KEEP=1` (test) leaves the consumer project and
its bundles in the temp directory.

## How

`src/consumer.ts` builds core, aws4signer, s3, aws, cloudflare and prisma the
way `pnpm build` does, packs each one with `pnpm pack`, and unpacks the
tarballs into `node_modules` of a new temp project, with the workspace's
`effect` linked in. The bundlers see exactly what npm users install, and
nothing from the workspace (no `src/` through a `bun` condition, no
`tsconfig.json`). No network.

The fixtures (`fixtures/`) call one operation per lazy load against an HTTP
client that answers 400. A call whose module loaded fails with that service's
typed error; one whose module did not load fails with `SdkError: an SDK
module failed to load`.

| case (`src/cases.ts`) | settings | runs in Node |
| --- | --- | --- |
| esbuild node / browser | `bundle`, ESM, `splitting`, `minify` | yes |
| esbuild workerd | wrangler: one file, conditions `workerd`, `worker`, `browser` | yes |
| rolldown node / browser | ESM, `minify` | yes |
| Vite node | SSR build, `ssr.noExternal: true` | yes |
| Vite browser | client build | no: its preload helper adds `<link>` tags |
| webpack node | production, CommonJS | yes |
| webpack browser | production, `target: "web"` | no: chunks load with `<script>` tags |

`fixtures/grpc-sockets.mjs` runs the gRPC transport for Workers. A Node module
hook (`fixtures/sockets-hooks.mjs`) resolves `cloudflare:sockets` to a stub, so
the check proves the bundled `import()` reaches the runtime. webpack replaces
`import(variable)` with an empty context that always rejects, so its case is
an expected failure (`it.fails`); see `todo.md`.

## Results (2026-11-08, one laptop run, 3 runs)

Node 24.19.0, esbuild 0.28.2, rolldown 1.2.13, Vite 8.3.4, webpack 5.112.2.
`first` is the first build of a case in the process, `median` the median of
the rest; bytes and gzip count every JavaScript file of the bundle.

| bundler | target | first | median | files | bytes | gzip |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| esbuild | node | 177 ms | 95 ms | 61 | 496.5 KB | 163.2 KB |
| esbuild | browser | 92 ms | 102 ms | 39 | 447.9 KB | 144.0 KB |
| rolldown | node | 114 ms | 99 ms | 60 | 497.3 KB | 158.6 KB |
| rolldown | browser | 130 ms | 104 ms | 38 | 450.3 KB | 139.9 KB |
| vite | node | 268 ms | 129 ms | 60 | 482.7 KB | 157.2 KB |
| vite | browser | 156 ms | 177 ms | 38 | 440.1 KB | 140.1 KB |
| webpack | node | 3523 ms | 2892 ms | 31 | 638.8 KB | 210.0 KB |
| webpack | browser | 2678 ms | 2597 ms | 21 | 548.4 KB | 174.7 KB |
| esbuild | workerd | 101 ms | 91 ms | 1 | 457.4 KB | 135.6 KB |

Treat timings as ±30%; sizes are stable. webpack is about 25× slower and
emits about 30% more bytes than the others with its defaults (terser).
