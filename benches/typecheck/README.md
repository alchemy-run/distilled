# @distilled.cloud/bench-typecheck

How long `tsc -b` takes on the Distilled SDKs, and how much memory it needs.
A measurement harness, not a pass/fail test: it exists so a change to the
generators (or to TypeScript) that makes the repo slower to typecheck shows
up as a number, not as a vague "CI feels slow".

```sh
pnpm bench:typecheck                     # core, aws, cloudflare, monorepo — ~5 min
pnpm bench:typecheck -- --full           # every SDK package + monorepo — much longer
pnpm bench:typecheck -- --runs 3         # best of 3 clean+incremental cycles per row
pnpm bench:typecheck -- --filter aws     # only targets whose name matches
pnpm bench:typecheck -- --json           # machine-readable results on stdout
pnpm bench:typecheck:record              # refresh results/latest.json (committed)
pnpm --filter @distilled.cloud/bench-typecheck bench
```

Runner is Bun; the compiler is the repo's own `typescript` (catalog `build`,
TypeScript 7 — the native `tsc`), invoked as `node
node_modules/typescript/bin/tsc`, exactly what `pnpm typecheck` runs.

## What is measured

Every target is measured four ways:

| column | values            | meaning                                                                                                  |
| ------ | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `mode` | `emit` \| `check` | `emit` = `tsc -b` with the repo's `noCheck: true` (`pnpm typecheck`); `check` = `tsc -b --noCheck false` (`pnpm typecheck:ci`) |
| `run`  | `clean` \| `incr` | `clean` = build outputs deleted first; `incr` = the same command run again immediately, nothing changed  |

Both matter: `emit` is what every developer pays locally, `check` is the CI
gate and the only thing that actually type-checks the generated code.

Per row: wall-clock seconds (spawn → exit), peak resident set size of the
`tsc` process (`ru_maxrss`), and tsc's own `--extendedDiagnostics`
phase split (`Aggregate Check time`, `Aggregate Emit time`, `Projects
built`). tsc 7 builds referenced projects in parallel, so on the `monorepo`
row the aggregate phase times are summed across workers and can exceed
wall time. Up-to-date runs print no phase split; those cells show `-`.

Targets:

| target       | tsconfig                          | note                                                 |
| ------------ | --------------------------------- | ---------------------------------------------------- |
| `core`       | `packages/core/tsconfig.json`     | hand-written; what every SDK references              |
| `aws`        | `packages/aws/tsconfig.json`      | largest generated surface in the default set (gcp is bigger; see `--full`) |
| `cloudflare` | `packages/cloudflare/tsconfig.json` | the other alchemy-hot provider                     |
| `monorepo`   | `tsconfig.json`                   | every package's `tsconfig.json` + `tsconfig.scripts.json`, i.e. `pnpm typecheck` / `pnpm typecheck:ci` |
| `--full`     | every `packages/*/tsconfig.json`  | the SDK config only, not the `tsconfig.scripts.json` sibling |

Package rows are ordered largest `src/` first, except `core`, which always
runs first so it is already built before any package that references it.
`mode` is the outer loop for the same reason: `core` is built under `check`
before `aws check` runs. The `projects` column reads `1` when that
isolation held.

### What a clean run deletes

Before each `clean` run the harness removes, for every package in the
target:

- `packages/<pkg>/lib/` — the emit directory (`outDir`)
- `packages/<pkg>/tsconfig.tsbuildinfo` — the incremental build state
- `packages/<pkg>/.scripts-types/` — emit + build state of `tsconfig.scripts.json`

For a package target that is that one package; referenced projects (`core`)
are left alone, so a package row measures that package only. For
`monorepo` it is all of them. Nothing under `src/` or `node_modules/` is
touched, and all of the above is gitignored. The harness does not clean up
afterwards: when it finishes the repo is in the same state as after
`pnpm typecheck:ci`.

## Reading the numbers

`results/latest.json` is one run on one dev box (16 cores, 30 GB RAM,
Linux x64, TypeScript 7.0.2, Node 24). Expect ±10 % run to run on the same
box; do not compare across machines. Numbers below are rounded.

| target     | mode  | run   | wall s | peak RSS | tsc check | tsc emit |
| ---------- | ----- | ----- | -----: | -------: | --------: | -------: |
| core       | emit  | clean |   0.20 |  225 MiB |         0 |     0.05 |
| aws        | emit  | clean |    6.5 |  4.9 GiB |         0 |      5.2 |
| cloudflare | emit  | clean |   10.5 |  1.3 GiB |         0 |     10.0 |
| monorepo   | emit  | clean |     75 |  5.7 GiB |         0 |       81 |
| core       | check | clean |   0.33 |  256 MiB |      0.05 |     0.03 |
| aws        | check | clean |   17.5 | 10.3 GiB |      11.6 |      3.1 |
| cloudflare | check | clean |   18.2 |  2.2 GiB |      15.4 |      2.3 |
| monorepo   | check | clean |    179 | 11.5 GiB |       165 |       31 |
| *any*      | *any* | incr  | ≤ 0.3  | ≤ 150 MiB |        - |        - |

### Findings

- **Incremental is free.** With nothing changed every target — including
  the whole monorepo — finishes in well under a second at ~50–150 MiB. The
  cost of `pnpm typecheck` day to day is entirely the clean build.
- **`noCheck` buys ~2.5× on the monorepo** (75 s → 179 s) **and ~2× peak
  memory** (5.7 → 11.5 GiB). That is the trade `tsconfig.base.json` makes,
  and why the full check is CI-only.
- **AWS is memory-bound, Cloudflare is time-bound.** AWS is 65 MB of
  source across 492 files and needs 4.9 GiB just to emit and 10.3 GiB to
  check; its check time (11.6 s) is spent in the checker. Cloudflare is
  half the source in a quarter of the files, uses a fraction of the memory,
  yet takes *longer* to emit (10 s vs 6.5 s) — its per-file cost is much
  higher, which points at the generated types themselves (large service
  files with deep Effect `Schema` compositions) rather than at volume.
- **Emit dominates `emit`, and for AWS emit is not cheap.** With
  `noCheck`, declaration emit is the whole cost. AWS spends 5.2 s of its
  6.5 s there; a generator change that simplifies emitted declarations
  moves this row directly.
- **The monorepo `emit` row is ~4× the sum of aws + cloudflare** because
  it also builds the other 77 SDKs plus every `tsconfig.scripts.json`
  (159 projects). tsc 7 builds projects concurrently (`--builders`), but
  81 s of aggregate emit against 75 s of wall shows that concurrency is
  barely helping here — most of the graph is serialised behind `core`
  and the two big packages.
- **A full `pnpm typecheck:ci` needs a ~12 GiB machine.** Below that the
  monorepo check row swaps or dies; run per-package rows instead.

## Caveats

- One process at a time, on a shared box. Background load shifts wall time;
  `--runs 3` and the best-of keep-rule dampen it.
- Peak RSS is that of the `tsc` process itself (`ru_maxrss` of the direct
  child). tsc 7 builds concurrently in-process, so it is the real peak; if
  a future version forked worker processes the number would undercount.
- The harness measures the compiler as installed. Bumping the `typescript`
  catalog entry changes every row; re-record after doing so.
