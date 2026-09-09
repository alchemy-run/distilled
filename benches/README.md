# benches

Benchmark suites for the Distilled SDKs. Measurements, not pass/fail tests;
none of them touch the network.

| suite      | what it measures                                              | run                    |
| ---------- | ------------------------------------------------------------- | ---------------------- |
| `runtime/` | CPU per call: schema codecs, request build, full mocked call  | `pnpm bench:runtime`   |
| `bundle/`  | rolldown tree-shake + bundle time (owned by bench-bundle)     | `pnpm bench:bundle`    |

Both run under Bun and are workspace members (`benches/*` in
`pnpm-workspace.yaml`) so one `pnpm install` covers them. They are not part
of the root `tsc -b`; each has its own `typecheck` script.
