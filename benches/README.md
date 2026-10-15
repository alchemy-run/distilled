# benches

Benchmark suites for the Distilled SDKs. Measurements, not pass/fail tests;
none of them touch the network.

| suite        | what it measures                                                  | run                    |
| ------------ | ----------------------------------------------------------------- | ---------------------- |
| `runtime/`   | CPU per call: schema codecs, request build, full mocked call      | `pnpm bench:runtime`   |
| `bundle/`    | rolldown tree-shake + bundle time (owned by bench-bundle)         | `pnpm bench:bundle`    |
| `typecheck/` | `tsc -b` wall time + peak RSS: emit vs full check, clean vs incr  | `pnpm bench:typecheck` |
| `sdks/`      | per SDK: download, 1-auth + 1-operation bundle, import heap, first call, added latency; official SDKs for comparison | `node benches/sdks/run.ts` |
| `schema-lab/` | schema representations side by side (Effect Schema, compiled, schema-lite) | see its README |
| `dashboard/` | charts every `sdks/` run over time, plus experiments (`runs/` holds the history) | `cd benches/dashboard && pnpm dev` |

All run under Bun and are workspace members (`benches/*` in
`pnpm-workspace.yaml`) so one `pnpm install` covers them. They are not part
of the root `tsc -b`; each has its own `typecheck` script.
