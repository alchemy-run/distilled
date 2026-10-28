# otel-lab (brainstorm)

What distilled's errors, stack traces and spans look like under each
telemetry level, on real SDK calls with mocked HTTP. Prototype only: the
`Telemetry` reference lives in `packages/core/src/telemetry.ts` on the
`pear/otel-debug-layer-brainstorm` branch.

```sh
pnpm --filter @distilled.cloud/otel-lab lab   # writes ../dashboard/telemetry/lab.json
pnpm --filter @distilled.cloud/bench-dashboard dev
# open http://127.0.0.1:5199/telemetry.html
```

Every call records its operation span when an exporter is installed. Debug
spans for distilled's internals are opt in:
`Effect.provide(TelemetryDebug.layer)` from
`@distilled.cloud/core/telemetry-debug`.
`TelemetryDebug.layerWith({ logRequests: true })` also prints each request
and response to stderr.
A layer always wins over the environment.

`research/` holds the four reports this design came from (2026-10-24; they
predate the decision to have only `operation` and `debug` levels):
OTel semantic conventions, a survey of other SDKs, Effect v4 tracing
internals, and stack traces / profiling / redaction. Their benchmark
scripts lived under `/tmp/otel-research/` and are not kept.
