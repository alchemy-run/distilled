# bench dashboard

Hot-reloading view of the per-SDK benchmarks in `benches/sdks`, and the
store for their runs. Run every command below from `benches/dashboard`.

```sh
pnpm dev                          # http://127.0.0.1:5199
pnpm slim                         # shrink runs/*.json before you commit them
pnpm single                       # dist-single/distilled-bench.html: one offline file to share
pnpm bench                        # run every suite, save to runs/
pnpm bench -- --only aws,resend   # any benches/sdks/run.ts flag
DISTILLED_REPO=~/other/distilled pnpm bench   # another checkout

pnpm history                                   # origin/main's tip, if not recorded yet
pnpm history -- --fetch                        # git fetch origin main first
pnpm history -- --since 2026-09-20 --every 2d  # last commit of every 2nd day
pnpm history -- --last 5                       # the last 5 commits
pnpm history -- 1db06c7e1 cced62a87            # these commits
```

`pnpm history` runs the current benchmark (benches/sdks and its frozen
targets.json, copied from `DISTILLED_REPO`, default this checkout)
against past commits of distilled in a detached worktree at `~/.cache/distilled-bench/checkout`,
so every point measures the same programs. A commit that already has a
full run is skipped (`--force` re-runs it). A first build of an old commit
takes about 20 minutes; the benchmark itself about 6.

- `runs/*.json` — one file per run (`<timestamp>-<sha>.json`). The
  committed runs are slim: `pnpm slim` keeps only the fields the page
  reads (about 0.1 MB a run, from 0.5–1.2 MB raw). The page
  imports them with `import.meta.glob`, so a new or edited run file reloads
  it live. Each file carries its own metric catalogue, so new metrics show
  up without touching this page.
- One page. Three metrics: bundle size, runtime speed (added latency) and
  runtime memory (import heap). Charts show every timeline run in commit
  order; the log lists every run with its change from the run before it.
- Key metrics: bundle size, runtime speed (added latency), runtime memory
  (import heap) and objects at import (live JS objects, recorded since the
  `imports` suite was added; older runs have no point).
- Per provider (charts): a provider picker ("All providers" or one SDK).
  Line charts over time for download size (tar.gz), heap and objects with
  every service imported, and import time per service. Bar charts for the
  latest run: download, heap and objects per provider, and import time of
  every provider/service pair (top 25, "Show all" for the rest); with one
  provider picked, import time and heap of each of its services. Click a
  provider bar to pick it.
- Providers table: one row per SDK package from the latest timeline run: SDK
  tar.gz, SDK + core tar.gz, heap / objects / import time with every
  service imported, median and slowest single-service import. Click a
  header to sort, a row to list every provider/service pair (import time
  and heap of that one module). The `imports` suite of `benches/sdks`
  records these; runs before it show only the download columns.
- Everything works offline: no CDN, charts are hand-rolled SVG.

## Experiments

An experiment is a one-off run: something you tried that is not a commit
on the timeline. The page keeps experiments off the timeline charts and
off the run-to-run changes, and compares them in the Experiments section.

```sh
# …make the change you want to try in this checkout…
cd benches/dashboard
pnpm bench -- --experiment "lazy error classes v2" --build
pnpm bench -- --experiment "aws signing cache" --only aws --build   # some SDKs only
```

Always pass `--build`. The runtime suites read the compiled `lib/`, and
`--build` runs `tsc -b` plus the checkout's `scripts/strip-lib-docs.ts`,
the same as `pnpm build`. A bare `tsc -b` skips the JSDoc strip and
inflates import memory.

`scripts/bench.mjs` benchmarks `DISTILLED_REPO` (default: the
checkout this dashboard lives in) and stores the run in `runs/` with the note
`experiment: <name>`.

A run is an experiment when any of these is true:

1. Its note starts with `experiment` (what `--experiment` writes).
2. The checkout had uncommitted changes (`git.dirty`).
3. It ran with `--only` (`partial`).

How the page shows an experiment:

- Run log: a row tagged `experiment`, numbered E1, E2, … in run order,
  directly above the run it compares with. Its changes are from that run.
- Baseline: the timeline run of the same commit. If that commit has no
  run, the last timeline run made before the experiment. Benchmark the
  commit first (`pnpm history -- <sha>`) when you want a same-commit
  comparison.
- Experiments section: a checkbox per experiment, a table (change vs its
  baseline and vs the latest run) and one chart per metric with each
  ticked experiment as a flat dashed line across the timeline. The
  comparison uses only the programs every ticked experiment ran, so a
  `--only aws` experiment is compared with the timeline's aws programs.
- Main charts: experiments are hidden. The "Draw experiments as flat
  lines" checkbox shows the ones that ran every program.

To drop an experiment, delete its file in `runs/`; the page reloads.

Do not run other heavy work (tests, tsc, a history run) while a benchmark
runs. Machine load inflates added latency (17 µs to about 25 µs once).
